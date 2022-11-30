import axios from 'axios';
import '@testing-library/jest-dom';
import { SitesAndUsersService } from '../../src/services/sitesAndUsers.service';


jest.mock('axios');

describe("sitesAndUsers.service", () => {

  const mockService = new SitesAndUsersService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return correct name of site when function is called', async () => {
    // Given
    const mSitesAndUsers = [
      {
        site_id: 1,
        name: "Abacws",
        user_id: 1
      },
      {
        site_id: 2,
        name: "National Software Academy",
        user_id: 1
      },
      {
        site_id: 3,
        name: "Queens Building",
        user_id: 1
      }
    ];
    mockedAxios.get.mockResolvedValue({
      data: mSitesAndUsers
    });

    // When
    const result = await mockService.findSitesAndUsersByUserId(1);

    // Then
    expect(result).toEqual(mSitesAndUsers);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/sites-and-users/1");
  });
});