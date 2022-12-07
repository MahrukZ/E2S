import axios from "axios";
import { ConsumptionController} from "../../controllers/consumptions.controller";
import { IConsumption } from "../../data/models/consumptions.model";

jest.mock('axios');

jest.mock('../../controllers/consumptions.controller', () => {
    const mConsumptionController = { 
        bulkCreateConsumptions: jest.fn(),
        createConsumption: jest.fn(),
        getAllConsumptions: jest.fn(),
        findAllConsumptionsBySiteIdAndTime: jest.fn(),
        findSumOfConsumptionsBySiteIdAndTime: jest.fn()
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
        const mConsumption: IConsumption[] = [{
            consumptionId: 1,
            timeInterval: mockDateObject,
            heatDemand: 1897,
            electricityDemand: 1699,
            co2Emissions: 695.39,
            electricityPrice: 18,
            gasPrice: 15,
            siteId: 1,
            orgId: 1
        },
        {
            consumptionId: 2,
            timeInterval: mockDateObject,
            heatDemand: 2897,
            electricityDemand: 2699,
            co2Emissions: 1082.15,
            electricityPrice: 28,
            gasPrice: 25,
            siteId: 2,
            orgId: 2
        },
        {
            consumptionId: 3,
            timeInterval: mockDateObject,
            heatDemand: 3897,
            electricityDemand: 3699,
            co2Emissions: 1468.91,
            electricityPrice: 38,
            gasPrice: 35,
            siteId: 3,
            orgId: 3
        }];
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

    describe('GET /api/consumption/find/:start/:end/:id', () => {
        const mConsumption: IConsumption[] = [{
            consumptionId: 1,
            timeInterval: mockDateObject,
            heatDemand: 1897,
            electricityDemand: 1699,
            co2Emissions: 695.39,
            electricityPrice: 18,
            gasPrice: 15,
            siteId: 1,
            orgId: 1
        },
        {
            consumptionId: 2,
            timeInterval: mockDateObject,
            heatDemand: 2897,
            electricityDemand: 2699,
            co2Emissions: 1082.15,
            electricityPrice: 28,
            gasPrice: 25,
            siteId: 2,
            orgId: 2
        },
        {
            consumptionId: 3,
            timeInterval: mockDateObject,
            heatDemand: 3897,
            electricityDemand: 3699,
            co2Emissions: 1468.91,
            electricityPrice: 38,
            gasPrice: 35,
            siteId: 3,
            orgId: 3
        }];
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
            const mUrl = "/api/consumption/find/:start/:end/:id";
            const getSpy = jest
                .spyOn(controller, 'findAllConsumptionsBySiteIdAndTime');

            // When
            const result = await axios.get(mUrl);
            await controller.findAllConsumptionsBySiteIdAndTime(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('GET /api/consumption/find-sum/:start/:end/:id', () => {
        const mConsumption: IConsumption[] = [{
            consumptionId: 1,
            timeInterval: mockDateObject,
            heatDemand: 1897,
            electricityDemand: 1699,
            co2Emissions: 695.39,
            electricityPrice: 18,
            gasPrice: 15,
            siteId: 1,
            orgId: 1
        },
        {
            consumptionId: 2,
            timeInterval: mockDateObject,
            heatDemand: 2897,
            electricityDemand: 2699,
            co2Emissions: 1082.15,
            electricityPrice: 28,
            gasPrice: 25,
            siteId: 2,
            orgId: 2
        },
        {
            consumptionId: 3,
            timeInterval: mockDateObject,
            heatDemand: 3897,
            electricityDemand: 3699,
            co2Emissions: 1468.91,
            electricityPrice: 38,
            gasPrice: 35,
            siteId: 3,
            orgId: 3
        }];
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
            const mUrl = "/api/consumption/find-sum/:start/:end/:id";
            const getSpy = jest
                .spyOn(controller, 'findSumOfConsumptionsBySiteIdAndTime');

            // When
            const result = await axios.get(mUrl);
            await controller.findSumOfConsumptionsBySiteIdAndTime(req, res);

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
    //         consumptionId: 4,
    //         timeInterval: mockDateObject,
    //         heatDemand: 1897,
    //         electricityDemand: 1699,
    //         co2Emissions: 695.39,
    //         electricityPrice: 18,
    //         gasPrice: 15,
    //         siteId: 1,
    //         orgId: 1
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
            consumptionId: 1,
            timeInterval: mockDateObject,
            heatDemand: 1897,
            electricityDemand: 1699,
            co2Emissions: 695.39,
            electricityPrice: 18,
            gasPrice: 15,
            siteId: 1,
            orgId: 1
        },
        {
            consumptionId: 2,
            timeInterval: mockDateObject,
            heatDemand: 2897,
            electricityDemand: 2699,
            co2Emissions: 1082.15,
            electricityPrice: 28,
            gasPrice: 25,
            siteId: 2,
            orgId: 2
        },
        {
            consumptionId: 3,
            timeInterval: mockDateObject,
            heatDemand: 3897,
            electricityDemand: 3699,
            co2Emissions: 1468.91,
            electricityPrice: 38,
            gasPrice: 35,
            siteId: 3,
            orgId: 3
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