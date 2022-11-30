import { InsightController } from "../../controllers/insights.controller";
import { IInsight } from "../../data/models/insights.model";
import { InsightService } from "../../services/insights.service";

jest.mock('../../services/insights.service', () => {
    const mInsightService = { 
        createInsight: jest.fn(),
        deleteInsight: jest.fn(),
        getAllInsights: jest.fn(),
        updateInsight: jest.fn(),
    };
    return {
        InsightService: jest.fn(() => mInsightService)
    };
});

describe("InsightController", () => {    
    const service = new InsightService();
    const controller = new InsightController();

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

    describe("InsightController.createInsight", () => {
        const mCreateBody: IInsight = {
            insightId: 4,
            description: 'new insight'
        };
        const mSuccessReponse: any = {
            message: 'Created',
            status: 201,
            data: mCreateBody
        };
        const mFailResponse: any = {
            message: "server error: failed to create insight.",
            status: 500
        };

        it('should create an insight when request body is provided', async () => {
            // Given
            const req = mRequest(mCreateBody);
            const res = mResponse();
            const createSpy = jest
                .spyOn(service, 'createInsight')
                .mockResolvedValue(mCreateBody);

            // When
            await controller.createInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mSuccessReponse);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy.mock.results[0].value).toEqual(Promise.resolve(mCreateBody));
        });

        it('should not create an insight when request body is not provided', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const createSpy = jest
                .spyOn(service, 'createInsight')
                .mockRejectedValue({});

            // When
            await controller.createInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(createSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("InsightController.deleteInsight", () => {
        const mSuccessResponse: any = {
            message: 'Successfully deleted 1 record.',
            status: 202
        };
        const mFailResponse: any = {
            message: "server error: failed to delete insight.",
            status: 500
        };
        const mDeleteParams: number = 1;

        it('should delete an insight when request params are provided', async () => {
            // Given
            const req = mRequest('', mDeleteParams);
            const res = mResponse();
            const deleteSpy = jest
                .spyOn(service, 'deleteInsight')
                .mockResolvedValue(mDeleteParams);

            // When
            await controller.deleteInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(202);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy.mock.results[0].value).toEqual(Promise.resolve(mDeleteParams));
        });

        it('should not delete an insight when request params are not provided', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const deleteSpy = jest
                .spyOn(service, 'deleteInsight')
                .mockRejectedValue({});

            // When
            await controller.deleteInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(deleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("InsightController.getAllInsights", () => {
        const mInsight: IInsight[] = [
            {
                insightId: 1,
                description: 'insight 1'
            },
            {
                insightId: 2,
                description: 'insight 2'
            },
            {
                insightId: 3,
                description: 'insight 3'
            }
        ];
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mInsight
        };
        const mFailResponse: any = {
            message: "server error: failed to fetch insights.",
            status: 500
        };

        it('should fetch all insights when there is data in the response', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllInsights')
                .mockResolvedValueOnce(mInsight);

            // When
            await controller.getAllInsights(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });

        it('should not fetch insights when there is no data in the response', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllInsights')
                .mockRejectedValue({});

            // When
            await controller.getAllInsights(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(getSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("InsightController.updateInsight", () => {
        const mSuccessResponse: any = {
            message: 'Successfully updated 1 record.',
            status: 200
        };
        const mFailResponse: any = {
            message: "server error: failed to update insight.",
            status: 500
        };
        const mUpdateBody: IInsight = {
            insightId: 1,
            description: 'updated insight'
        };

        it('should update an insight when request body is provided', async () => {
            // Given
            const req = mRequest(mUpdateBody);
            const res = mResponse();
            const updateSpy = jest
                .spyOn(service, 'updateInsight')
                .mockResolvedValue(mUpdateBody);

            // When
            await controller.updateInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy.mock.results[0].value).toEqual(Promise.resolve(mUpdateBody));
        });

        it('should not update an insight when request body is not provided', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const updateSpy = jest
                .spyOn(service, 'updateInsight')
                .mockRejectedValue({});

            // When
            await controller.updateInsight(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mFailResponse);

            expect(updateSpy).toHaveBeenCalledTimes(1);
        });
    });
});