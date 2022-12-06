import axios from 'axios';
import '@testing-library/jest-dom';
import { InsightsService } from '../../src/services/insights.service';

jest.mock('axios');

describe("insights.service", () => {

  const mockService = new InsightsService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return correct insights when function is called', async () => {
    // Given
    const mInsights = [
      {
        insightId: 1,
        description: "In the last 7 days, the total costs of [site] has changed by [data] compared to the previous 7 days."
      },
      {
        insightId: 2,
        description: "In the last 7 days, the electricity consumption of [site] has changed by [data] compared to the previous 7 days."
      },
      {
        insight: 3,
        description: "In the last 7 days, the gas consumption of [site] has changed by [data] compared to the previous 7 days."
      }
    ];
    mockedAxios.get.mockResolvedValue({
      data: mInsights
    });

    // When
    const result = await mockService.getInsights();

    // Then
    expect(result).toEqual(mInsights);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/insights");
  });


});