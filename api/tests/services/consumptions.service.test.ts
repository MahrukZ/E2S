import { IConsumption } from "../../data/models/consumptions.model";
import { ConsumptionRepository } from "../../data/repositories/consumptions.repository";
import { ConsumptionService } from "../../services/consumptions.service";

jest.mock('../../data/repositories/consumptions.repository', () => {
    const mConsumptionRepo = { 
        bulkCreateConsumptions: jest.fn(),
        createConsumption: jest.fn(),
        getAllConsumptions: jest.fn()
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
                consumption_id: 1,
                time_interval: mockDateObject,
                heat_demand: 1897,
                electricity_demand: 1699,
                electricity_price: 18,
                gas_price: 65,
                site_id: 1,
                org_id: 1
            },
            {
                consumption_id: 2,
                time_interval: mockDateObject,
                heat_demand: 2897,
                electricity_demand: 2699,
                electricity_price: 28,
                gas_price: 65,
                site_id: 2,
                org_id: 2 
            },
            {
                consumption_id: 3,
                time_interval: mockDateObject,
                heat_demand: 3897,
                electricity_demand: 3699,
                electricity_price: 38,
                gas_price: 65,
                site_id: 3,
                org_id: 3 
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
                consumption_id: 4,
                time_interval: mockDateObject,
                heat_demand: 2897,
                electricity_demand: 2699,
                electricity_price: 98,
                gas_price: 65,
                site_id: 11,
                org_id: 11
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
            const mConsumption: IConsumption[] = [
                {
                    consumption_id: 1,
                    time_interval: mockDateObject,
                    heat_demand: 2897,
                    electricity_demand: 2699,
                    electricity_price: 98,
                    gas_price: 65,
                    site_id: 1,
                    org_id: 1
                },
                {
                    consumption_id: 2,
                    time_interval: mockDateObject,
                    heat_demand: 2513,
                    electricity_demand: 2450,
                    electricity_price: 78,
                    gas_price: 95,
                    site_id: 5,
                    org_id: 5
                },
                {
                    consumption_id: 3,
                    time_interval: mockDateObject,
                    heat_demand: 2315,
                    electricity_demand: 2216,
                    electricity_price: 88,
                    gas_price: 85,
                    site_id: 8,
                    org_id: 8
                }
            ];
            const getSpy = jest
                .spyOn(repository, 'getAllConsumptions')
                .mockResolvedValue(mConsumption);

            // When
            const result = await service.getAllConsumptions();

            // Then
            expect(result).toEqual(mConsumption);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });
});