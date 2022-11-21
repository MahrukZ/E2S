import { ConsumptionController } from "../../controllers/consumptions.controller";
import { IConsumption } from "../../data/models/consumptions.model";
import { ConsumptionService } from "../../services/consumptions.service";

jest.mock('../../services/consumptions.service', () => {
    const mConsumptionService = { 
        createConsumption: jest.fn(),
        getAllConsumptions: jest.fn(),
    };
    return {
        ConsumptionService: jest.fn(() => mConsumptionService)
    };
});

describe("ConsumptionController", () => {    
    const service = new ConsumptionService();
    const controller = new ConsumptionController();
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

    describe("ConsumptionController.createConsumption", () => {
        const mCreateBody: IConsumption = {
            consumption_id: 4,
            time_interval: mockDateObject,
            heat_demand: 2897,
            electricity_demand: 2699,
            electricity_price: 98,
            gas_price: 65,
            site_id: 11,
            org_id: 11
        };
        const mSuccessReponse: any = {
            message: 'Created',
            status: 201,
            data: mCreateBody
        };
        const mFailResponse: any = {
            message: "server error: failed to create consumption.",
            status: 500
        };

        it('should create a consumption when request body is provided', async () => {
            // Given
            const req = mRequest(mCreateBody);
            const res = mResponse();
            const createSpy = jest
                .spyOn(service, 'createConsumption')
                .mockResolvedValue(mCreateBody);

            // When
            await controller.createConsumption(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mSuccessReponse);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy.mock.results[0].value).toEqual(Promise.resolve(mCreateBody));
        });

        it('should not create a consumption when request body is not provided', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const createSpy = jest
                .spyOn(service, 'createConsumption')
                .mockRejectedValue({});

            // When
            await controller.createConsumption(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(createSpy).toHaveBeenCalledTimes(1);
        });
    });
});
