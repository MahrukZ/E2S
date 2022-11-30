import axios from 'axios';
import '@testing-library/jest-dom'
import { ConsumptionsService } from '../../src/services/consumptions.service'
import "@types/jest"

jest.mock('axios');

describe("consumptions.service", () => {

    const mockService = new ConsumptionsService();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockDateObject = new Date("2021-02-26T20:42:16.652Z");
  
    it('should return correct consumptions when function is called', async () => {
      // Given
      const mConsumptions = [
        {
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
        }
      ];
      mockedAxios.get.mockResolvedValue({
        data: mConsumptions
      });
  
      // When
      const result = await mockService.getAllConsumptions();
  
      // Then
      expect(result).toEqual(mConsumptions);
  
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/api/consumptions");
    });
  });
  