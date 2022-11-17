import { Request, Response } from "express";
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

    const mRequest = (body?: any, param?: any) => {
        const req: any = {};
        req.body = jest.fn().mockReturnValue(body || req);
        req.param = jest.fn().mockReturnValue(param || req);
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

    describe("InsightController.getAllInsights", () => {
        const mGetSuccess: any = {
            message: 'Success',
            status: 200,
            data: [
                {
                    'insight_id': 1,
                    'description': 'insight 1',
                },
                {
                    'insight_id': 2,
                    'description': 'insight 2',
                },
                {
                    'insight_id': 3,
                    'description': 'insight 3',
                },
            ],
        };

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
        it('should return all insights', async () => {
            // Given
            const req = mRequest();
            const res = mResponse();
            const getSpy = jest
                .spyOn(service, 'getAllInsights')
                .mockResolvedValueOnce(mInsight);

            // When
            await controller.getAllInsights(req as Request, res as Response);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mGetSuccess);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });
});