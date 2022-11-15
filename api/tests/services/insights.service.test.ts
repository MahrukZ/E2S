import { IInsight } from "../../data/models/insights.model";
import { InsightRepository } from "../../data/repositories/insights.repository";
import { InsightService } from "../../services/insights.service";

jest.mock('../../data/repositories/insights.repository', () => {
    const mInsightRepo = { 
        createInsight: jest.fn(),
        deleteInsight: jest.fn(),
        getAllInsights: jest.fn(),
        updateInsight: jest.fn()
    };
    return {
        InsightRepository: jest.fn(() => mInsightRepo)
    };
});


describe('InsightService', () => {
    const insightRepository = new InsightRepository();
    const insightService = new InsightService();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('InsightService.createInsight', () => {
        it('should create an insights', async () => {
            // Given
            const mockCreateInsight: IInsight = {
                insight_id: 4,
                description: 'new insight'
            };
            const createSpy = jest
                .spyOn(insightRepository, 'createInsight')
                .mockResolvedValue(mockCreateInsight);

            // When
            const result = await insightService.createInsight(mockCreateInsight);

            // Then
            expect(result).toEqual(mockCreateInsight);
            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(mockCreateInsight);
        });
    });

    describe('InsightService.deleteInsight', () => {
        it('should delete an insights', async () => {
            // Given
            const insightId = 2;
            const mockResponse = true;
            const deleteSpy = jest
                .spyOn(insightRepository, 'deleteInsight')
                .mockResolvedValue(mockResponse);

            // When
            const result = await insightService.deleteInsight(insightId);

            // Then
            expect(result).toEqual(mockResponse);
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy).toHaveBeenCalledWith(insightId);
        });
    });

    describe('InsightService.getAllInsights', () => {
        it('should return all insights', async () => {
            // Given
            const mockResponse: IInsight[] = [
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
            const spy = jest
                .spyOn(insightRepository, 'getAllInsights')
                .mockResolvedValue(mockResponse);

            // When
            const result = await insightService.getAllInsights();

            // Then
            expect(result).toEqual(mockResponse);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith();
        });
    });

    describe('InsightService.updateInsight', () => {
        it('should update an insights', async () => {
            // Given
            const mockUpdateInsight: IInsight = {
                insight_id: 1,
                description: 'updated insight'
            };
            const updateSpy = jest
                .spyOn(insightRepository, 'updateInsight')
                .mockResolvedValue(mockUpdateInsight);

            // When
            const result = await insightService.updateInsight(mockUpdateInsight);

            // Then
            expect(result).toEqual(mockUpdateInsight);
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenCalledWith(mockUpdateInsight);
        }); 
    });   
});