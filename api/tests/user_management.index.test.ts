import axios from "axios";
import { UserManagementController } from "../controllers/user_management.controller";
import { IUserManagement } from "../data/models/user_management.model";

jest.mock('axios');

jest.mock('../controllers/user_management.controller', () => {
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

    describe('GET /api/user_managements', () => {
        const mUserManagement: IUserManagement[] = [
            {
                user_id: 1,
                first_name: 'Martin',
                last_name: 'James',
                email: 'martinjames@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 3,
                role: 'director of estates'
            },
            {
                user_id: 2,
                first_name: 'Rhy',
                last_name: 'Jones',
                email: 'rhyjones@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 1,
                role: 'facility energy manager'
            },
            {
                user_id: 3,
                first_name: 'James',
                last_name: 'Ohay',
                email: 'jamesohay@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 3,
                role: 'facility energy manager'
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mUserManagement
        };
        mockedAxios.get.mockResolvedValue(mSuccessResponse);
        const req = mRequest();
        const res = mResponse();

        it('should fetch all user managements when there is data', async () => {
            // Given
            const mUrl = "/api/user_managements";
            const getSpy = jest
                .spyOn(controller, 'getAllUserManagements');

            // When
            const result = await axios.get(mUrl);
            await controller.getAllUserManagements(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('GET /api/user_management/:id', () => {
        const mUserManagement: IUserManagement[] = [
            {
                user_id: 1,
                first_name: 'Martin',
                last_name: 'James',
                email: 'martinjames@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 3,
                role: 'director of estates'
            },
            {
                user_id: 2,
                first_name: 'Rhy',
                last_name: 'Jones',
                email: 'rhyjones@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 1,
                role: 'facility energy manager'
            },
            {
                user_id: 3,
                first_name: 'James',
                last_name: 'Ohay',
                email: 'jamesohay@cardiff.ac.uk',
                organisation: 'Cardiff University',
                no_sites_managed: 3,
                role: 'facility energy manager'
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mUserManagement
        };
        const mFetchParams: number = 1;
        mockedAxios.get.mockResolvedValue(mSuccessResponse);
        const req = mRequest('', mFetchParams);
        const res = mResponse();

        it('should find user managements when request params are provided', async () => {
            // Given
            const mUrl = `/api/user_managment/${mFetchParams}`;
            const getSpy = jest
                .spyOn(controller, 'findUserManagementByUserId')
                .mockResolvedValue(mFetchParams);

            // When
            const result = await axios.get(mUrl);
            await controller.findUserManagementByUserId(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });
});
