import axios from "axios"
import { SiteController } from "../../controllers/sites.controller";
import { ISite } from "../../data/models/sites.model";

jest.mock('axios');

jest.mock('../../controllers/sites.controller', () => {
    const mSiteController = { 
        findSiteById: jest.fn()
    };
    return {
        SiteController: jest.fn(() => mSiteController)
    };
});

describe('index', () => {
    const controller = new SiteController();
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const mRequest = (body?: any, params?: any) => {
        const req: any = {};
        req.body = jest.fn().mockReturnValue(body || req);
        req.params = jest.fn().mockReturnValue(params || req);
        return req;
    };
    const mResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/site/:id', () => {
        const mSite: ISite = 
        {
            siteId: 1,
            name: "Abacws",
            location: "Cathays",
            orgId: 1
        };
        const mSuccessResponse1: any = {
            message: 'Success',
            status: 200,
            data: mSite
        };
        const mFetchParams: number = 1;
        mockedAxios.get.mockResolvedValue(mSuccessResponse1);
        const req = mRequest('', mFetchParams);
        const res = mResponse();

        it('should find site when request params are provided', async () => {
            // Given
            const mUrl = `/api/sites/${mFetchParams}`;
            const getSpy = jest
                .spyOn(controller, 'findSiteById')
                .mockResolvedValue(mFetchParams);

            // When
            const result = await axios.get(mUrl);
            await controller.findSiteById(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse1);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

});
