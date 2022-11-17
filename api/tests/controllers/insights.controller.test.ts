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
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("InsightController.createInsight", () => {
        const mCreateBody: IInsight = {
            insight_id: 4,
            description: 'new insight'
        };
        const mCreateSuccess: any = {
            message: 'Created',
            status: 201,
            data: mCreateBody
        };

        it('should create an insight', async () => {
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
            expect(res.json).toHaveBeenCalledWith(mCreateSuccess);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy.mock.results[0].value).toEqual(Promise.resolve(mCreateBody));
        });
    });

    describe("InsightController.deleteInsight", () => {
        const mDeleteSuccess: any = {
            message: 'Successfully deleted 1 record.',
            status: 202
        };
        const mDeleteParams: number = 1;

        it('should delete an insight', async () => {
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
            expect(res.json).toHaveBeenCalledWith(mDeleteSuccess);

            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy.mock.results[0].value).toEqual(Promise.resolve(mDeleteParams));
        });
    });

    describe("InsightController.getAllInsights", () => {
        const mInsight: IInsight[] = [
            {
                insight_id: 1,
                description: 'insight 1'
            },
            {
                insight_id: 2,
                description: 'insight 2'
            },
            {
                insight_id: 3,
                description: 'insight 3'
            }
        ];
        const mGetSuccess: any = {
            message: 'Success',
            status: 200,
            data: mInsight
        };

        it('should return all insights', async () => {
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
            expect(res.json).toHaveBeenCalledWith(mGetSuccess);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });

    describe("InsightController.updateInsight", () => {
        const mUpdateSuccess: any = {
            message: 'Successfully updated 1 record.',
            status: 200
        };
        const mUpdateBody: IInsight = {
            insight_id: 1,
            description: 'updated insight'
        };

        it('should update an insight', async () => {
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
            expect(res.json).toHaveBeenCalledWith(mUpdateSuccess);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy.mock.results[0].value).toEqual(Promise.resolve(mUpdateBody));
        });
    });
});