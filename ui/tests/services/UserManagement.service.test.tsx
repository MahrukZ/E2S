import axios from 'axios';
import '@testing-library/jest-dom';
import { UserManagementService } from '../../src/services/userManagement.service';

jest.mock('axios');

describe("userManagement.service", () => {

  const mockService = new UserManagementService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return correct user when function is called', async () => {
    // Given
    const mUser = [
      {
        user_id: 1,
        first_name: "Rhys",
        last_name: "Jones",
        email: "rhys.jones@cardiff.ac.uk",
        organisation: "Cardiff University",
        no_sites_managed: 3,
        role: "facility energy manager"
      }
    ];
    mockedAxios.get.mockResolvedValue({
      data: mUser
    });

    // When
    const result = await mockService.findUserManagementByUserId(1);

    // Then
    expect(result).toEqual(mUser);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/user-management/1");
  });
});