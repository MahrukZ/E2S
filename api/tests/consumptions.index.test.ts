import axios from "axios";
import { ConsumptionController} from "../controllers/consumptions.controller";
import { IConsumption } from "../data/models/consumptions.model";

jest.mock('axios');

jest.mock('../controllers/consumptions.controller', () => {
    const mConsumptionController = { 
        bulkCreateConsumptions: jest.fn(),
        createConsumption: jest.fn(),
        getAllConsumptions: jest.fn()
    };
    return {
        ConsumptionController: jest.fn(() => mConsumptionController)
    };
});

describe('index', () => {
    const controller = new ConsumptionController();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockDateObject = new Date("2021-02-26T20:42:16.652Z");

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

    describe('GET /api/consumptions', () => {
        const mConsumption: IConsumption[] = [
            {
                consumption_id: 1,
                time_interval: mockDateObject,
                heat_demand: 2897,
                electricity_demand: 2699,
                electricity_price: 98,
                gas_price: 65,
                site_id: 1,
                org_id: 1
            },
            {
                consumption_id: 2,
                time_interval: mockDateObject,
                heat_demand: 2513,
                electricity_demand: 2450,
                electricity_price: 78,
                gas_price: 95,
                site_id: 5,
                org_id: 5
            },
            {
                consumption_id: 3,
                time_interval: mockDateObject,
                heat_demand: 2315,
                electricity_demand: 2216,
                electricity_price: 88,
                gas_price: 85,
                site_id: 8,
                org_id: 8
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mConsumption
        };
        mockedAxios.get.mockResolvedValue(mSuccessResponse);
        const req = mRequest();
        const res = mResponse();

        it('should fetch all consumptions when there is data', async () => {
            // Given
            const mUrl = "/api/consumptions";
            const getSpy = jest
                .spyOn(controller, 'getAllConsumptions');

            // When
            const result = await axios.get(mUrl);
            await controller.getAllConsumptions(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

    // commented out for now as it is not being used and we cannot mock two post requests in
    // same test file
    // describe('POST /api/consumption', () => {
    //     const mCreateBody: IConsumption = {
    //         consumption_id: 4,
    //         time_interval: mockDateObject,
    //         heat_demand: 2897,
    //         electricity_demand: 2699,
    //         electricity_price: 98,
    //         gas_price: 65,
    //         site_id: 11,
    //         org_id: 11
    //     };
    //     const mSuccessReponse: any = {
    //         message: 'Created',
    //         status: 201,
    //         data: mCreateBody
    //     };
    //     mockedAxios.post.mockResolvedValue(mSuccessReponse);
    //     const req = mRequest(mCreateBody);
    //     const res = mResponse();

    //     it('should create a consumption when request body is provided', async () => {
    //         // Given
    //         const mUrl = "/api/consumption";
    //         const createSpy = jest
    //             .spyOn(controller, 'createConsumption')
    //             .mockResolvedValue(mCreateBody);

    //         // When
    //         const result = await axios.post(mUrl);
    //         await controller.createConsumption(req, res);

    //         // Then
    //         expect(result).toEqual(mSuccessReponse);

    //         expect(axios.post).toHaveBeenCalledTimes(1);
    //         expect(axios.post).toHaveBeenCalledWith(mUrl);

    //         expect(createSpy).toHaveBeenCalledTimes(1);
    //         expect(createSpy).toHaveBeenCalledWith(req, res);
    //     });
    // });

    describe('POST /api/consumption/bulk-create', () => {
        const mBulkCreateBody: IConsumption[] = [{
            consumption_id: 1,
            time_interval: mockDateObject,
            heat_demand: 1897,
            electricity_demand: 1699,
            electricity_price: 18,
            gas_price: 65,
            site_id: 1,
            org_id: 1
        },
        {
            consumption_id: 2,
            time_interval: mockDateObject,
            heat_demand: 2897,
            electricity_demand: 2699,
            electricity_price: 28,
            gas_price: 65,
            site_id: 2,
            org_id: 2 
        },
        {
            consumption_id: 3,
            time_interval: mockDateObject,
            heat_demand: 3897,
            electricity_demand: 3699,
            electricity_price: 38,
            gas_price: 65,
            site_id: 3,
            org_id: 3 
        }];
        const mSuccessReponse: any = {
            message: 'Created',
            status: 201,
            data: mBulkCreateBody
        };
        mockedAxios.post.mockResolvedValue(mSuccessReponse);
        const req = mRequest(mBulkCreateBody);
        const res = mResponse();

        it('should bulk create consumptions when request body is provided', async () => {
            // Given
            const mUrl = "/api/consumption/bulk-create";
            const bulkCreateSpy = jest
                .spyOn(controller, 'bulkCreateConsumptions')
                .mockResolvedValue(mBulkCreateBody);

            // When
            const result = await axios.post(mUrl);
            await controller.bulkCreateConsumptions(req, res);

            // Then
            expect(result).toEqual(mSuccessReponse);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(mUrl);

            expect(bulkCreateSpy).toHaveBeenCalledTimes(1);
            expect(bulkCreateSpy).toHaveBeenCalledWith(req, res);
        });
    });
});