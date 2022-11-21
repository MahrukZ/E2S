import { InsightRepository } from "../../../data/repositories/insights.repository";
import { Insights, IInsight } from "../../../data/models/insights.model";

describe('InsightRepository', () => {
    const insightRepository = new InsightRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('InsightRepository.getAllInsights', () => {
        it('should fetch all insights when there is data in the database', async () => {
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

        it('should not fetch insights when there is no data in the database', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to fetch all insights.");
            insightRepository.getAllInsights = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(insightRepository.getAllInsights).rejects.toMatchObject(mErrorMessage);
            expect(insightRepository.getAllInsights).toHaveBeenCalledTimes(1);
            expect(insightRepository.getAllInsights).toHaveBeenCalledWith();
        });
    });

    describe('InsightRepository.deleteInsight', () => {
        it('should delete an insight when Id is provided', async () => {
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

        it('should not delete an insight when there is no Id provided', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to delete insights.");
            insightRepository.deleteInsight = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(insightRepository.deleteInsight).rejects.toMatchObject(mErrorMessage);
            expect(insightRepository.deleteInsight).toHaveBeenCalledTimes(1);
            expect(insightRepository.deleteInsight).toHaveBeenCalledWith();
        });
    });

    describe('InsightRepository.createInsight', () => {
        it('should create an insight when there is insight data being passed', async () => {
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

        it('should not create an insight when there is no insight data being passed', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to create insight.");
            insightRepository.createInsight = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(insightRepository.createInsight).rejects.toMatchObject(mErrorMessage);
            expect(insightRepository.createInsight).toHaveBeenCalledTimes(1);
            expect(insightRepository.createInsight).toHaveBeenCalledWith();
        });
    });

    describe('InsightRepository.updateInsight', () => {
        it('should update an insight when there is insight data being passed', async () => {
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

        it('should not update an insight when there is insight data being passed', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to update insight.");
            insightRepository.updateInsight = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(insightRepository.updateInsight).rejects.toMatchObject(mErrorMessage);
            expect(insightRepository.updateInsight).toHaveBeenCalledTimes(1);
            expect(insightRepository.updateInsight).toHaveBeenCalledWith();
        });
    });
    
});