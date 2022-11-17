import axios from "axios";
import { InsightController } from "../controllers/insights.controller";
import { IInsight } from "../data/models/insights.model";

jest.mock('axios');

jest.mock('../controllers/insights.controller', () => {
    const mInsightController = { 
        createInsight: jest.fn(),
        deleteInsight: jest.fn(),
        getAllInsights: jest.fn(),
        updateInsight: jest.fn()
    };
    return {
        InsightController: jest.fn(() => mInsightController)
    };
});

describe('index', () => {
    const controller = new InsightController();
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

    describe('GET /api/insights', () => {
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
        const mSuccessResponse: any = {
            message: 'Success',
            status: 200,
            data: mInsight
        };
        mockedAxios.get.mockResolvedValue(mSuccessResponse);
        const req = mRequest();
        const res = mResponse();

        it('should fetch all insights when there is data', async () => {
            // Given
            const mUrl = "/api/insights";
            const getSpy = jest
                .spyOn(controller, 'getAllInsights');

            // When
            const result = await axios.get(mUrl);
            await controller.getAllInsights(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('POST /api/insights', () => {
        const mCreateBody: IInsight = {
            insight_id: 4,
            description: 'new insight'
        };
        const mSuccessReponse: any = {
            message: 'Created',
            status: 201,
            data: mCreateBody
        };
        mockedAxios.post.mockResolvedValue(mSuccessReponse);
        const req = mRequest(mCreateBody);
        const res = mResponse();

        it('should create an insight when request body is provided', async () => {
            // Given
            const mUrl = "/api/insight";
            const createSpy = jest
                .spyOn(controller, 'createInsight')
                .mockResolvedValue(mCreateBody);

            // When
            const result = await axios.post(mUrl);
            await controller.createInsight(req, res);

            // Then
            expect(result).toEqual(mSuccessReponse);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(mUrl);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(req, res);
        });
    });
});