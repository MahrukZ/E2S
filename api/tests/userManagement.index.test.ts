import axios from "axios"
import { UserManagementController } from "../controllers/userManagement.controller";
import { IUserManagement } from "../data/models/userManagement.model";

jest.mock('axios');

jest.mock('../controllers/userManagement.controller', () => {
    const mUserManagementController = { 
        getAllUserManagements: jest.fn(),
        findUserManagementByUserId: jest.fn()
    };
    return {
        UserManagementController: jest.fn(() => mUserManagementController)
    };
});

describe('index', () => {
    const controller = new UserManagementController();
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

    describe('GET /api/user-management/:id', () => {
        const mUserManagement1: IUserManagement = {
                userId: 1,
                firstName: "Martin",
                lastName: "James",
                email: "martinjames@cardiff.ac.uk",
                organisation: "Cardiff University",
                noSitesManaged: 3,
                role: "director of estates"
            }
        const mSuccessResponse1: any = {
            message: 'Success',
            status: 200,
            data: mUserManagement1
        };
        const mFetchParams: number = 1;
        mockedAxios.get.mockResolvedValue(mSuccessResponse1);
        const req = mRequest('', mFetchParams);
        const res = mResponse();

        it('should find user managements when request params are provided', async () => {
            // Given
            const mUrl = `/api/user-managment/${mFetchParams}`;
            const getSpy = jest
                .spyOn(controller, 'findUserManagementByUserId')
                .mockResolvedValue(mFetchParams);

            // When
            const result = await axios.get(mUrl);
            await controller.findUserManagementByUserId(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse1);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });
});
