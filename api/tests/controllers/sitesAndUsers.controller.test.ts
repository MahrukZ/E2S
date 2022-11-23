import { SitesAndUsersController } from "../../controllers/sitesAndUsers.controller";
import { ISitesAndUsers } from "../../data/models/sitesAndUsers.model";
import { SitesAndUsersService } from "../../services/sitesAndUsers.service";

jest.mock('../../services/sitesAndUsers.service', () => {
    const mSitesAndUsersService = { 
        getAllSitesAndUsers: jest.fn(),
        findSitesAndUsersByUserId: jest.fn(),
    };
    return {
        SitesAndUsersService: jest.fn(() => mSitesAndUsersService)
    };
});

describe("SitesAndUsersController", () => {    
    const service = new SitesAndUsersService();
    const controller = new SitesAndUsersController();

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

    describe("SitesAndUsersController.getAllSitesAndUsers", () => {
        const mSitesAndUsers: ISitesAndUsers[] = [
            {
                site_id: 1,
                name: "Abacws",
                user_id: 1
            },
            {
                site_id: 1,
                name: "Abacws",
                user_id: 3
            },
            {
                site_id: 2,
                name: "National Software Academy",
                user_id: 1
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mSitesAndUsers
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch sites and users.",
            status: 500
        };

        it('should fetch all sites and users when there is data in the database', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllSitesAndUsers')
                .mockResolvedValueOnce(mSitesAndUsers);

            // When
            await controller.getAllSitesAndUsers(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });

        it('should not fetch sites and users when there is no data in the database', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllSitesAndUsers')
                .mockRejectedValue({});

            // When
            await controller.getAllSitesAndUsers(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("SitesAndUsersController.findSitesAndUsersByUserId", () => {
        const mSitesAndUsers: ISitesAndUsers[] = [
            {
                site_id: 1,
                name: "Abacws",
                user_id: 1
            },
            {
                site_id: 1,
                name: "Abacws",
                user_id: 3
            },
            {
                site_id: 2,
                name: "National Software Academy",
                user_id: 1
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mSitesAndUsers
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch sites and users.",
            status: 500
        };
        const mParameter : number = 1;

        it('should fetch when parameter is provided', async () => {
            // Given
            const req = mRequest("", mParameter);
            const res = mResponse();
            const updateSpy = jest
            .spyOn(service, 'findSitesAndUsersByUserId')
            .mockResolvedValue(mSitesAndUsers);

            // When
            await controller.findSitesAndUsersByUserId(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

        });

        it('should not fetch when parameter is not provided', async () => {
           // Given
           const req = mRequest();
           const res = mResponse();
           const updateSpy = jest
           .spyOn(service, 'findSitesAndUsersByUserId')
           .mockRejectedValue({});

           // When
           await controller.findSitesAndUsersByUserId(req, res);

           // Then
           expect(res.status).toHaveBeenCalledWith(500);
           expect(res.json).toHaveBeenCalledWith(mFailResponse);

        });
    });
});
