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

    // Commented out since you can only mock one axios get request
    // describe('GET /api/user-managements', () => {
    //     const mUserManagements: IUserManagement[] = [
    //         {
    //             userId: 1,
    //             firstName: "Rhys",
    //             lastName: "Jones",
    //             email: "rhys.jones@cardiff.ac.uk",
    //             organisation: "Cardiff University",
    //             noSitesManaged: 3,
    //             role: "facility energy manager"
    //         },
    //         {
    //             userId: 2,
    //             firstName: "Johnny",
    //             lastName: "Bravo",
    //             email: "johnny.bravo@nhs.gov.uk",
    //             organisation: "National Health Service",
    //             noSitesManaged: 7,
    //             role: "director of estates"
    //         },
    //         {
    //             userId: 3,
    //             firstName: "Cai",
    //             lastName: "Robert",
    //             email: "cairobert@e2s.co.uk",
    //             organisation: "Empowering Energy Solutions",
    //             noSitesManaged: 0,
    //             role: "administrator"
    //         }
    //     ];
    //     const mSuccessResponse: any = {
    //         message: 'Success',
    //         status: 200,
    //         data: mUserManagements
    //     };
    //     const mFetchParams: number = 1;
    //     mockedAxios.get.mockResolvedValue(mSuccessResponse);
    //     const req = mRequest('', mFetchParams);
    //     const res = mResponse();

    //     it('should find user managements when request params are provided', async () => {
    //         // Given
    //         const mUrl = `/api/user-managements`;
    //         const getSpy = jest
    //             .spyOn(controller, 'getAllUserManagements')
    //             .mockResolvedValue(mFetchParams);

    //         // When
    //         const result = await axios.get(mUrl);
    //         await controller.getAllUserManagements(req, res);

    //         // Then
    //         expect(result).toEqual(mSuccessResponse);

    //         expect(axios.get).toHaveBeenCalledTimes(1);
    //         expect(axios.get).toHaveBeenCalledWith(mUrl);

    //         expect(getSpy).toHaveBeenCalledTimes(1);
    //         expect(getSpy).toHaveBeenCalledWith(req, res);
    //     });
    // });

    describe('GET /api/user-management/:id', () => {
        const mUserManagement: IUserManagement = {
            userId: 1,
            firstName: "Rhys",
            lastName: "Jones",
            email: "rhys.jones@cardiff.ac.uk",
            organisation: "Cardiff University",
            noSitesManaged: 3,
            role: "facility energy manager"
        };
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
            const mUrl = `/api/user-management/${mFetchParams}`;
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
