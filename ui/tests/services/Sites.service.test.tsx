import axios from 'axios';
import '@testing-library/jest-dom';
import { SitesService } from '../../src/services/sites.service';

jest.mock('axios');

describe("sites.service", () => {

  const mockService = new SitesService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return correct sites when function is called', async () => {
    // Given
    const mSites = [
      {
        site_id: 1,
        name: "Abacws",
        location: "Cathays",
        org_id: 1
      },
      {
        site_id: 2,
        name: "National Software Academy",
        location: "Newport",
        org_id: 1
      },
      {
        site_id: 3,
        name: "Queens Building",
        location: "Cardiff",
        org_id: 1
      }
    ];
    mockedAxios.get.mockResolvedValue({
      data: mSites
    });

    // When
    const result = await mockService.getSites();

    // Then
    expect(result).toEqual(mSites);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/sites");
  });
});