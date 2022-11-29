import { UserManagementController } from "../../controllers/userManagement.controller";
import { IUserManagement } from "../../data/models/userManagement.model";
import { UserManagementService } from "../../services/userManagement.service";

jest.mock('../../services/userManagement.service', () => {
    const mUserManagementService = { 
        getAllUserManagements: jest.fn(),
        findUserManagementByUserId: jest.fn(),
    };
    return {
        UserManagementService: jest.fn(() => mUserManagementService)
    };
});

describe("UserManagementController", () => {    
    const service = new UserManagementService();
    const controller = new UserManagementController();

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

    describe("UserManagementController.getAllUserManagements", () => {
        const mUserManagement: IUserManagement[] = [
            {
                userId: 1,
                firstName: "Martin",
                lastName: "James",
                email: "martinjames@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 3,
                role: "director of estates"
            },
            {
                userId: 2,
                firstName: "Rhy",
                lastName: "Jones",
                email: "rhyjones@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 1,
                role: "facility energy manager"
            },
            {
                userId: 3,
                firstName: "James",
                lastName: "Ohay",
                email: "jamesohay@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 3,
                role: "facility energy manager"
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mUserManagement
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch user management data.",
            status: 500
        };

        it('should fetch all user management data when there is data in the database', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllUserManagements')
                .mockResolvedValueOnce(mUserManagement);

            // When
            await controller.getAllUserManagements(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });

        it('should not fetch user management data when there is no data in the database', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllUserManagements')
                .mockRejectedValue({});

            // When
            await controller.getAllUserManagements(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("UserManagementController.findUserManagementByUserId", () => {
        const mUserManagement: IUserManagement[] = [
            {
                userId: 1,
                firstName: "Martin",
                lastName: "James",
                email: "martinjames@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 3,
                role: "director of estates"
            },
            {
                userId: 2,
                firstName: "Rhy",
                lastName: "Jones",
                email: "rhyjones@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 1,
                role: "facility energy manager"
            },
            {
                userId: 3,
                firstName: "James",
                lastName: "Ohay",
                email: "jamesohay@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 3,
                role: "facility energy manager"
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mUserManagement
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch user management data.",
            status: 500
        };
        const mParameter : number = 1;

        it('should fetch when parameter is provided', async () => {
            // Given
            const req = mRequest("", mParameter);
            const res = mResponse();
            const fetchSpy = jest
            .spyOn(service, 'findUserManagementByUserId')
            .mockResolvedValue(mUserManagement);

            // When
            await controller.findUserManagementByUserId(req, res);

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
           .spyOn(service, 'findUserManagementByUserId')
           .mockRejectedValue({});

           // When
           await controller.findUserManagementByUserId(req, res);

           // Then
           expect(res.status).toHaveBeenCalledWith(500);
           expect(res.json).toHaveBeenCalledWith(mFailResponse);

           expect(fetchSpy).toHaveBeenCalledTimes(1);
        });
    });
});
