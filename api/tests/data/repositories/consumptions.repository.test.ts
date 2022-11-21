import { ConsumptionRepository } from "../../../data/repositories/consumptions.repository";
import { Consumptions, IConsumption } from "../../../data/models/consumptions.model";

describe('ConsumptionRepository', () => {
    const consumptionRepository = new ConsumptionRepository();
    const mockDateObject = new Date("2021-02-26T20:42:16.652Z");

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('ConsumptionRepository.getAllConsumptions', () => {
        it('should fetch all consumptions when there is data in the database', async () => {
            // Given
            const mockResponse: IConsumption[] = [
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
                    heat_demand: 2897,
                    electricity_demand: 2699,
                    electricity_price: 98,
                    gas_price: 65,
                    site_id: 5,
                    org_id: 5
                },
                {
                    consumption_id: 3,
                    time_interval: mockDateObject,
                    heat_demand: 2897,
                    electricity_demand: 2699,
                    electricity_price: 98,
                    gas_price: 65,
                    site_id: 8,
                    org_id: 8
                }
            ];
            Consumptions.findAll = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await consumptionRepository.getAllConsumptions();

            // Then
            expect(result).toEqual(mockResponse);
            expect(Consumptions.findAll).toHaveBeenCalledTimes(1);
            expect(Consumptions.findAll).toHaveBeenCalledWith();
        });

        it('should not fetch consumptions when there is no data in the database', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to fetch all consumptions.");
            consumptionRepository.getAllConsumptions = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(consumptionRepository.getAllConsumptions).rejects.toMatchObject(mErrorMessage);
            expect(consumptionRepository.getAllConsumptions).toHaveBeenCalledTimes(1);
            expect(consumptionRepository.getAllConsumptions).toHaveBeenCalledWith();
        });
    });

    describe('ConsumptionRepository.createConsumption', () => {
        it('should create a consumption when there is consumption data being passed', async () => {
            // Given
            const mockCreateConsumption: IConsumption = {
                consumption_id: 4,
                time_interval: mockDateObject,
                heat_demand: 2897,
                electricity_demand: 2699,
                electricity_price: 98,
                gas_price: 65,
                site_id: 11,
                org_id: 11
            }

            Consumptions.create = jest.fn().mockResolvedValue(mockCreateConsumption);

            // When
            const result = await consumptionRepository.createConsumption(mockCreateConsumption);

            // Then
            expect(result).toEqual(mockCreateConsumption);
            expect(Consumptions.create).toHaveBeenCalledTimes(1);
            expect(Consumptions.create).toHaveBeenCalledWith(mockCreateConsumption);
        });

        it('should not create a consumption when there is no consumption data being passed', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to create consumption.");
            consumptionRepository.createConsumption = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(consumptionRepository.createConsumption).rejects.toMatchObject(mErrorMessage);
            expect(consumptionRepository.createConsumption).toHaveBeenCalledTimes(1);
            expect(consumptionRepository.createConsumption).toHaveBeenCalledWith();
        });
    });
});