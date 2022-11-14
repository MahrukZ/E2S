import { InsightRepository } from "../../../data/repositories/insights.repository";
import { Insights, IInsight } from "../../../data/models/insights.model";

describe('InsightRepository', () => {
    const insightRepository = new InsightRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('InsightRepository.getAllInsights', () => {
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
            Insights.findAll = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await insightRepository.getAllInsights();

            // Then
            expect(result).toEqual(mockResponse);
            expect(Insights.findAll).toHaveBeenCalledTimes(1);
            expect(Insights.findAll).toHaveBeenCalledWith();
        });
    });

    describe('InsightRepository.deleteInsight', () => {
        it('should delete an insight', async () => {
            // Given
            const insightId = 1;
            const mockResponse = true;

            Insights.destroy = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await insightRepository.deleteInsight(insightId);

            // Then
            expect(result).toEqual(mockResponse);
            expect(Insights.destroy).toHaveBeenCalledTimes(1);
            expect(Insights.destroy).toBeCalledWith({
                where: {
                    insight_id: insightId
                }
            });
        });
    });

    describe('InsightRepository.createInsight', () => {
        it('should create an insight', async () => {
            // Given
            const mockCreateInsight: IInsight = {
                insight_id: 4,
                description: 'new insight'
            }

            Insights.create = jest.fn().mockResolvedValue(mockCreateInsight);

            // When
            const result = await insightRepository.createInsight(mockCreateInsight);

            // Then
            expect(result).toEqual(mockCreateInsight);
            expect(Insights.create).toHaveBeenCalledTimes(1);
            expect(Insights.create).toHaveBeenCalledWith(mockCreateInsight);
        });
    });

    describe('InsightRepository.updateInsight', () => {
        it('should update an insight', async () => {
            // Given
            const mockUpdateInsight: IInsight = {
                insight_id: 2,
                description: 'updated insight'
            }

            Insights.update = jest.fn().mockResolvedValue(mockUpdateInsight);

            // When
            const result = await insightRepository.updateInsight(mockUpdateInsight);

            // Then
            expect(result).toEqual(mockUpdateInsight);
            expect(Insights.update).toHaveBeenCalledTimes(1);
            expect(Insights.update).toBeCalledWith(
                {
                    insight_id: mockUpdateInsight.insight_id,
                    description: mockUpdateInsight.description
                },
                {
                    where: {
                        insight_id: mockUpdateInsight.insight_id
                    }
                }      
            );
        });
    });
    
});