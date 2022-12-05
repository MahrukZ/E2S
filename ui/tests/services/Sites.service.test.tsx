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
        siteId: 1,
        name: "Abacws",
        location: "Cathays",
        orgId: 1
      },
      {
        siteId: 2,
        name: "National Software Academy",
        location: "Newport",
        orgId: 1
      },
      {
        siteId: 3,
        name: "Queens Building",
        location: "Cardiff",
        orgId: 1
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


  // Can only mock one Axios.get
//   it('should return correct sites when function is called', async () => {
//     // Given
//     const mSite = 
//       {
//         siteId: 3,
//         name: "Queens Building",
//         location: "Cardiff",
//         orgId: 1
//       };
//     mockedAxios.get.mockResolvedValue({
//       data: mSite
//     });

//     // When
//     const result = await mockService.findSiteById(1);

//     // Then
//     expect(result).toEqual(mSite);

//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith("/api/site/1");
//   });


});