import axios from "axios";
import { InsightController } from "../controllers/insights.controller";
import { IInsight } from "../data/models/insights.model";
import { SitesAndUsersController } from "../controllers/sites_and_users.controller";
import { ISitesAndUsers } from "../data/models/sites_and_users.model";

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

jest.mock('../controllers/sites_and_users.controller', () => {
    const mSitesAndUsersController = { 
        getAllSitesAndUsers: jest.fn(),
        findSitesAndUsersByUserId: jest.fn()
    };
    return {
        SitesAndUsersController: jest.fn(() => mSitesAndUsersController)
    };
});

describe('index', () => {
    const insightController = new InsightController();
    const sitesAndUsersController = new SitesAndUsersController();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedSitesAndUsersAxios = axios as jest.Mocked<typeof axios>;

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
    const mSitesAndUsersRequest = (body1?: any, params1?: any) => {
        const req1: any = {};
        req1.body1 = jest.fn().mockReturnValue(body1 || req1);
        req1.params1 = jest.fn().mockReturnValue(params1 || req1);
        return req1;
    };
    const mSitesAndUsersResponse = () => {
        const res1: any = {};
        res1.status = jest.fn().mockReturnValue(res1);
        res1.json = jest.fn().mockReturnValue(res1);
        return res1;
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
                .spyOn(insightController, 'getAllInsights');

            // When
            const result = await mockedAxios.get(mUrl);
            await insightController.getAllInsights(req, res);

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
                .spyOn(insightController, 'createInsight')
                .mockResolvedValue(mCreateBody);

            // When
            const result = await axios.post(mUrl);
            await insightController.createInsight(req, res);

            // Then
            expect(result).toEqual(mSuccessReponse);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(mUrl);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('PUT /api/insight', () => {
        const mSuccessResponse: any = {
            message: 'Successfully updated 1 record.',
            status: 200
        };
        const mUpdateBody: IInsight = {
            insight_id: 1,
            description: 'updated insight'
        };
        mockedAxios.put.mockResolvedValue(mSuccessResponse);
        const req = mRequest(mUpdateBody);
        const res = mResponse();

        it('should update an insight when request body is provided', async () => {
            // Given
            const mUrl = "/api/insight";
            const updateSpy = jest
                .spyOn(insightController, 'updateInsight')
                .mockResolvedValue(mUpdateBody);

            // When
            const result = await axios.put(mUrl);
            await insightController.updateInsight(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(mUrl);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('DELETE /api/insight/:id', () => {
        const mSuccessResponse: any = {
            message: 'Successfully deleted 1 record.',
            status: 202
        };
        const mDeleteParams: number = 1;
        mockedAxios.delete.mockResolvedValue(mSuccessResponse);
        const req = mRequest('', mDeleteParams);
        const res = mResponse();

        it('should delete an insight when request params are provided', async () => {
            // Given
            const mUrl = `/api/insight/${mDeleteParams}`;
            const deleteSpy = jest
                .spyOn(insightController, 'deleteInsight')
                .mockResolvedValue(mDeleteParams);

            // When
            const result = await axios.delete(mUrl);
            await insightController.deleteInsight(req, res);

            // Then
            expect(result).toEqual(mSuccessResponse);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(mUrl);

            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy).toHaveBeenCalledWith(req, res);
        });
    });

    describe('GET /api/sites_and_users', () => {
        const mSitesAndUsers: ISitesAndUsers[] = [
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 1
            },
            {
                site_id: 1,
                name: 'Abacws',
                user_id: 3
            },
            {
                site_id: 2,
                name: 'National Software Academy',
                user_id: 1
            }
        ];
        const mSuccessResponse1: any = {
            message: 'Success',
            status: 201,
            data: mSitesAndUsers
        };
        mockedSitesAndUsersAxios.get.mockResolvedValue(mSuccessResponse1);
        const req1 = mSitesAndUsersRequest();
        const res1 = mSitesAndUsersResponse();

        it('should fetch all sites and users when there is data', async () => {
            // Given
            const mUrl1 = "/api/sites_and_users";
            const getSpy1 = jest
                .spyOn(sitesAndUsersController, 'getAllSitesAndUsers');

            // When
            const result1 = await mockedSitesAndUsersAxios.get(mUrl1);
            await sitesAndUsersController.getAllSitesAndUsers(req1, res1);

            // Then
            expect(result1).toEqual(mSuccessResponse1);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(mUrl1);

            expect(getSpy1).toHaveBeenCalledTimes(1);
            expect(getSpy1).toHaveBeenCalledWith(req1, res1);
        });
    });

});