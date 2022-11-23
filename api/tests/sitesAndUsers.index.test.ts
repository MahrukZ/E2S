import axios from "axios"
import { SitesAndUsersController } from "../controllers/sitesAndUsers.controller";
import { ISitesAndUsers } from "../data/models/sitesAndUsers.model";

jest.mock('axios');

jest.mock('../controllers/sitesAndUsers.controller', () => {
    const mSitesAndUsersController = { 
        getAllSitesAndUsers: jest.fn(),
        findSitesAndUsersByUserId: jest.fn()
    };
    return {
        SitesAndUsersController: jest.fn(() => mSitesAndUsersController)
    };
});

describe('index', () => {
    const controller = new SitesAndUsersController();
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

    describe('GET /api/sites_and_users', () => {
        const mSitesAndUser: ISitesAndUsers[] = [
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 1
            },
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 3
            },
            {
                site_id: 2,
                name: 'National Software Academy',
                user_id: 1
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mSitesAndUser
        };
        mockedAxios.get.mockResolvedValue(mSuccessResponse);
        const req = mRequest();
        const res = mResponse();

        it('should fetch all sites and users when there is data', async () => {
            // Given
            const mUrl = "/api/sites_and_users";
            const getSpy = jest
                .spyOn(controller, 'getAllSitesAndUsers');

            // When
            const result = await axios.get(mUrl);
            await controller.getAllSitesAndUsers(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('GET /api/sites_and_users/:id', () => {
        const mSitesAndUser: ISitesAndUsers[] = [
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 1
            },
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 3
            },
            {
                site_id: 2,
                name: 'National Software Academy',
                user_id: 1
            }
        ];
        const mSuccessResponse1: any = {
            message: 'Success',
            status: 200,
            data: mSitesAndUser
        };
        const mFetchParams: number = 1;
        mockedAxios.get.mockResolvedValue(mSuccessResponse1);
        const req = mRequest('', mFetchParams);
        const res = mResponse();

        it('should find sites and users when request params are provided', async () => {
            // Given
            const mUrl = `/api/sites_and_users/${mFetchParams}`;
            const getSpy = jest
                .spyOn(controller, 'findSitesAndUsersByUserId')
                .mockResolvedValue(mFetchParams);

            // When
            const result = await axios.get(mUrl);
            await controller.findSitesAndUsersByUserId(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse1);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

});
