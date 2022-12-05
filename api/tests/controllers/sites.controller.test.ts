import { SiteController } from "../../controllers/sites.controller";
import { ISite } from "../../data/models/sites.model";
import { SiteService } from "../../services/sites.service";

jest.mock('../../services/sites.service', () => {
    const mSiteService = { 
        findSiteById: jest.fn()
    };
    return {
        SiteService: jest.fn(() => mSiteService)
    };
});

describe("SiteController", () => {    
    const service = new SiteService();
    const controller = new SiteController();

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

    describe("SitesAndUsersController.findSiteById", () => {
        const mSite: ISite =
            {
                siteId: 1,
                name: "Abacws",
                location: "Cathays",
                orgId: 1
            };
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mSite
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch site by Id.",
            status: 500
        };
        const mParameter : number = 1;

        it('should fetch when parameter is provided', async () => {
            // Given
            const req = mRequest("", mParameter);
            const res = mResponse();
            const fetchSpy = jest
            .spyOn(service, 'findSiteById')
            .mockResolvedValue(mSite);

            // When
            await controller.findSiteById(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(fetchSpy).toHaveBeenCalledTimes(1);
        });

        it('should not fetch when parameter is not provided', async () => {
           // Given
           const req = mRequest();
           const res = mResponse();
           const fetchSpy = jest
           .spyOn(service, 'findSiteById')
           .mockRejectedValue({});

           // When
           await controller.findSiteById(req, res);

           // Then
           expect(res.status).toHaveBeenCalledWith(500);
           expect(res.json).toHaveBeenCalledWith(mFailResponse);

           expect(fetchSpy).toHaveBeenCalledTimes(1);
        });
    });
});
