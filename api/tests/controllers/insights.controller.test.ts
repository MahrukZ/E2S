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
        const mCreateSuccess: any = {
            message: 'Created',
            status: 201,
            data: { 'insight_id': 4, 'description': 'new insight' }
        };
        const mCreateBody: IInsight = {
            insight_id: 4,
            description: 'new insight'
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
            // expect(createSpy).toHaveBeenCalledWith(mCreateBody);
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
            // expect(deleteSpy).toHaveBeenCalledWith(mDeleteParams);
        });
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
            await controller.getAllInsights(req, res);

            // Then
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mGetSuccess);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });
});