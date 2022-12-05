import { IConsumption } from "../../data/models/consumptions.model";
import { ConsumptionRepository } from "../../data/repositories/consumptions.repository";
import { ConsumptionService } from "../../services/consumptions.service";

jest.mock('../../data/repositories/consumptions.repository', () => {
    const mConsumptionRepo = { 
        bulkCreateConsumptions: jest.fn(),
        createConsumption: jest.fn(),
        getAllConsumptions: jest.fn(),
        findAllConsumptionsBySiteIdAndTime: jest.fn(),
        findSumOfConsumptionsBySiteIdAndTime: jest.fn()
    };
    return {
        ConsumptionRepository: jest.fn(() => mConsumptionRepo)
    };
});

describe('ConsumptionService', () => {
    const repository = new ConsumptionRepository();
    const service = new ConsumptionService();
    const mockDateObject = new Date("2021-02-26T20:42:16.652Z");

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('ConsumptionService.bulkCreateConsumptions', () => {
        it('should bulk create consumptions', async () => {
            // Given
            const mBulkCreateConsumptions: IConsumption[] = [{
                consumptionId: 1,
                timeInterval: mockDateObject,
                heatDemand: 1897,
                electricityDemand: 1699,
                co2Emissions: 695.39,
                electricityPrice: 18,
                gasPrice: 15,
                siteId: 1,
                orgId: 1
            },
            {
                consumptionId: 2,
                timeInterval: mockDateObject,
                heatDemand: 2897,
                electricityDemand: 2699,
                co2Emissions: 1082.15,
                electricityPrice: 28,
                gasPrice: 25,
                siteId: 2,
                orgId: 2
            },
            {
                consumptionId: 3,
                timeInterval: mockDateObject,
                heatDemand: 3897,
                electricityDemand: 3699,
                co2Emissions: 1468.91,
                electricityPrice: 38,
                gasPrice: 35,
                siteId: 3,
                orgId: 3
            }];
            const bulkCreateSpy = jest
                .spyOn(repository, 'bulkCreateConsumptions')
                .mockResolvedValue(mBulkCreateConsumptions);

            // When
            const result = await service.bulkCreateConsumptions(mBulkCreateConsumptions);

            // Then
            expect(result).toEqual(mBulkCreateConsumptions);
            expect(bulkCreateSpy).toHaveBeenCalledTimes(1);
            expect(bulkCreateSpy).toHaveBeenCalledWith(mBulkCreateConsumptions);
        });
    });

    describe('ConsumptionService.createConsumption', () => {
        it('should create consumption', async () => {
            // Given
            const mCreateConsumption: IConsumption = {
                consumptionId: 4,
                timeInterval: mockDateObject,
                heatDemand: 1897,
                electricityDemand: 1699,
                co2Emissions: 695.39,
                electricityPrice: 18,
                gasPrice: 15,
                siteId: 1,
                orgId: 1
            };
            const createSpy = jest
                .spyOn(repository, 'createConsumption')
                .mockResolvedValue(mCreateConsumption);

            // When
            const result = await service.createConsumption(mCreateConsumption);

            // Then
            expect(result).toEqual(mCreateConsumption);
            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(mCreateConsumption);
        });
    });

    describe('ConsumptionService.getAllConsumptions', () => {
        it('should return all consumptions', async () => {
            // Given
            const mConsumptions: IConsumption[] = [{
                consumptionId: 1,
                timeInterval: mockDateObject,
                heatDemand: 1897,
                electricityDemand: 1699,
                co2Emissions: 695.39,
                electricityPrice: 18,
                gasPrice: 15,
                siteId: 1,
                orgId: 1
            },
            {
                consumptionId: 2,
                timeInterval: mockDateObject,
                heatDemand: 2897,
                electricityDemand: 2699,
                co2Emissions: 1082.15,
                electricityPrice: 28,
                gasPrice: 25,
                siteId: 2,
                orgId: 2
            },
            {
                consumptionId: 3,
                timeInterval: mockDateObject,
                heatDemand: 3897,
                electricityDemand: 3699,
                co2Emissions: 1468.91,
                electricityPrice: 38,
                gasPrice: 35,
                siteId: 3,
                orgId: 3
            }];
            const getSpy = jest
                .spyOn(repository, 'getAllConsumptions')
                .mockResolvedValue(mConsumptions);

            // When
            const result = await service.getAllConsumptions();

            // Then
            expect(result).toEqual(mConsumptions);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });

    describe('ConsumptionService.findAllConsumptionsBySiteIdAndTime', () => {
        it('should return consumptions', async () => {
            // Given
            const mConsumption: IConsumption[] = [{
                consumptionId: 1,
                timeInterval: mockDateObject,
                heatDemand: 1897,
                electricityDemand: 1699,
                electricityPrice: 18,
                gasPrice: 15,
                siteId: 1,
                orgId: 1
            },
            {
                consumptionId: 2,
                timeInterval: mockDateObject,
                heatDemand: 2897,
                electricityDemand: 2699,
                electricityPrice: 28,
                gasPrice: 25,
                siteId: 2,
                orgId: 2
            },
            {
                consumptionId: 3,
                timeInterval: mockDateObject,
                heatDemand: 3897,
                electricityDemand: 3699,
                electricityPrice: 38,
                gasPrice: 35,
                siteId: 3,
                orgId: 3
            }];
            const getSpy = jest
                .spyOn(repository, 'findAllConsumptionsBySiteIdAndTime')
                .mockResolvedValue(mConsumption);

            // When
            const result = await service.findAllConsumptionsBySiteIdAndTime("", "", 1);

            // Then
            expect(result).toEqual(mConsumption);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith("", "", 1);
        });
    });

    describe('ConsumptionService.findSumOfConsumptionsBySiteIdAndTime', () => {
        it('should return consumptions', async () => {
            // Given
            const getSpy = jest
                .spyOn(repository, 'findSumOfConsumptionsBySiteIdAndTime')
                .mockResolvedValue([1, 2, 3]);

            // When
            const result = await service.findSumOfConsumptionsBySiteIdAndTime("", "", 1);

            // Then
            expect(result).toEqual([1, 2, 3]);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith("", "", 1);
        });
    });
});
