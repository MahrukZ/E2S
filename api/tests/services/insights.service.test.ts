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
    const repository = new InsightRepository();
    const service = new InsightService();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('InsightService.createInsight', () => {
        it('should create an insights', async () => {
            // Given
            const mCreateInsight: IInsight = {
                insightId: 4,
                description: 'new insight'
            };
            const createSpy = jest
                .spyOn(repository, 'createInsight')
                .mockResolvedValue(mCreateInsight);

            // When
            const result = await service.createInsight(mCreateInsight);

            // Then
            expect(result).toEqual(mCreateInsight);
            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(mCreateInsight);
        });
    });

    describe('InsightService.deleteInsight', () => {
        it('should delete an insights', async () => {
            // Given
            const insightId = 2;
            const mResponse = true;
            const deleteSpy = jest
                .spyOn(repository, 'deleteInsight')
                .mockResolvedValue(mResponse);

            // When
            const result = await service.deleteInsight(insightId);

            // Then
            expect(result).toEqual(mResponse);
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy).toHaveBeenCalledWith(insightId);
        });
    });

    describe('InsightService.getAllInsights', () => {
        it('should return all insights', async () => {
            // Given
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
            const getSpy = jest
                .spyOn(repository, 'getAllInsights')
                .mockResolvedValue(mInsight);

            // When
            const result = await service.getAllInsights();

            // Then
            expect(result).toEqual(mInsight);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });

    describe('InsightService.updateInsight', () => {
        it('should update an insights', async () => {
            // Given
            const mUpdateInsight: IInsight = {
                insightId: 1,
                description: 'updated insight'
            };
            const updateSpy = jest
                .spyOn(repository, 'updateInsight')
                .mockResolvedValue(mUpdateInsight);

            // When
            const result = await service.updateInsight(mUpdateInsight);

            // Then
            expect(result).toEqual(mUpdateInsight);
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenCalledWith(mUpdateInsight);
        }); 
    });   
});