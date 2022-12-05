import { ConsumptionRepository } from "../../../data/repositories/consumptions.repository";
import {
  Consumptions,
  IConsumption,
} from "../../../data/models/consumptions.model";

describe("ConsumptionRepository", () => {
  const consumptionRepository = new ConsumptionRepository();
  const mockDateObject = new Date("2021-02-26T20:42:16.652Z");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("ConsumptionRepository.bulkCreateConsumption", () => {
    it("should bulk create consumptions when there is consumption data being passed", async () => {
      // Given
      const mockBulkCreateConsumptions: IConsumption[] = [
        {
          consumptionId: 1,
          timeInterval: mockDateObject,
          heatDemand: 1897,
          electricityDemand: 1699,
          electricityPrice: 18,
          gasPrice: 15,
          siteId: 1,
          orgId: 1,
        },
        {
          consumptionId: 2,
          timeInterval: mockDateObject,
          heatDemand: 2897,
          electricityDemand: 2699,
          electricityPrice: 28,
          gasPrice: 25,
          siteId: 2,
          orgId: 2,
        },
        {
          consumptionId: 3,
          timeInterval: mockDateObject,
          heatDemand: 3897,
          electricityDemand: 3699,
          electricityPrice: 38,
          gasPrice: 35,
          siteId: 3,
          orgId: 3,
        },
      ];

      Consumptions.bulkCreate = jest
        .fn()
        .mockResolvedValue(mockBulkCreateConsumptions);

      // When
      const result = await consumptionRepository.bulkCreateConsumptions(
        mockBulkCreateConsumptions
      );

      // Then
      expect(result).toEqual(mockBulkCreateConsumptions);
      expect(Consumptions.bulkCreate).toHaveBeenCalledTimes(1);
      expect(Consumptions.bulkCreate).toHaveBeenCalledWith(
        mockBulkCreateConsumptions
      );
    });

    it("should not bulk create consumptions when there is no consumption data being passed", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to bulk create consumptions.");
      consumptionRepository.bulkCreateConsumptions = jest
        .fn()
        .mockRejectedValue(mErrorMessage);

      // Then
      expect(
        consumptionRepository.bulkCreateConsumptions
      ).rejects.toMatchObject(mErrorMessage);
      expect(
        consumptionRepository.bulkCreateConsumptions
      ).toHaveBeenCalledTimes(1);
      expect(
        consumptionRepository.bulkCreateConsumptions
      ).toHaveBeenCalledWith();
    });
  });

  describe("ConsumptionRepository.createConsumption", () => {
    it("should create a consumption when there is consumption data being passed", async () => {
      // Given
      const mockCreateConsumption: IConsumption = {
        consumptionId: 4,
        timeInterval: mockDateObject,
        heatDemand: 1897,
        electricityDemand: 1699,
        electricityPrice: 18,
        gasPrice: 15,
        siteId: 1,
        orgId: 1,
      };

      Consumptions.create = jest.fn().mockResolvedValue(mockCreateConsumption);

      // When
      const result = await consumptionRepository.createConsumption(
        mockCreateConsumption
      );

      // Then
      expect(result).toEqual(mockCreateConsumption);
      expect(Consumptions.create).toHaveBeenCalledTimes(1);
      expect(Consumptions.create).toHaveBeenCalledWith(mockCreateConsumption);
    });

    it("should not create a consumption when there is no consumption data being passed", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to create consumption.");
      consumptionRepository.createConsumption = jest
        .fn()
        .mockRejectedValue(mErrorMessage);

      // Then
      expect(consumptionRepository.createConsumption).rejects.toMatchObject(
        mErrorMessage
      );
      expect(consumptionRepository.createConsumption).toHaveBeenCalledTimes(1);
      expect(consumptionRepository.createConsumption).toHaveBeenCalledWith();
    });
  });

  describe("ConsumptionRepository.getAllConsumptions", () => {
    it("should fetch all consumptions when there is data in the database", async () => {
      // Given
      const mockResponse: IConsumption[] = [
        {
          consumptionId: 1,
          timeInterval: mockDateObject,
          heatDemand: 1897,
          electricityDemand: 1699,
          electricityPrice: 18,
          gasPrice: 15,
          siteId: 1,
          orgId: 1,
        },
        {
          consumptionId: 2,
          timeInterval: mockDateObject,
          heatDemand: 2897,
          electricityDemand: 2699,
          electricityPrice: 28,
          gasPrice: 25,
          siteId: 2,
          orgId: 2,
        },
        {
          consumptionId: 3,
          timeInterval: mockDateObject,
          heatDemand: 3897,
          electricityDemand: 3699,
          electricityPrice: 38,
          gasPrice: 35,
          siteId: 3,
          orgId: 3,
        },
      ];
      Consumptions.findAll = jest.fn().mockResolvedValue(mockResponse);

      // When
      const result = await consumptionRepository.getAllConsumptions();

      // Then
      expect(result).toEqual(mockResponse);
      expect(Consumptions.findAll).toHaveBeenCalledTimes(1);
      expect(Consumptions.findAll).toHaveBeenCalledWith();
    });

    it("should not fetch consumptions when there is no data in the database", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to fetch all consumptions.");
      consumptionRepository.getAllConsumptions = jest
        .fn()
        .mockRejectedValue(mErrorMessage);

      // Then
      expect(consumptionRepository.getAllConsumptions).rejects.toMatchObject(
        mErrorMessage
      );
      expect(consumptionRepository.getAllConsumptions).toHaveBeenCalledTimes(1);
      expect(consumptionRepository.getAllConsumptions).toHaveBeenCalledWith();
    });
  });
});
