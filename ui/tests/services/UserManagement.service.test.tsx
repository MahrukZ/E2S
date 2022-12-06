import axios from "axios";
import "@testing-library/jest-dom";
import { UserManagementService } from "../../src/services/userManagement.service";
import { IUserManagement } from "../../src/components/pages/admin/userManagement/UserTable";

jest.mock("axios");

describe("UserManagementService", () => {
  const mockService = new UserManagementService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  describe("UserManagementService.findUserManagementByUserId", () => {
    // Given
    const mUser: IUserManagement = {
      userId: 1,
      firstName: "Rhys",
      lastName: "Jones",
      email: "rhys.jones@cardiff.ac.uk",
      organisation: "Cardiff University",
      noSitesManaged: 3,
      role: "facility energy manager",
    };
    mockedAxios.get.mockResolvedValue({
      data: mUser,
    });

    it("should return correct user when function is called", async () => {
      // When
      const result = await mockService.findUserManagementByUserId(1);

      // Then
      expect(result).toEqual(mUser);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/api/user-management/1");
    });
  });

  // Commented out since you can only mock one axios get request
  // describe('UserManagementService.getAllUserManagements', () => {
  //   // Given
  //   const mUser: IUserManagement[] = [
  //     {
  //       userId: 1,
  //       firstName: "Rhys",
  //       lastName: "Jones",
  //       email: "rhys.jones@cardiff.ac.uk",
  //       organisation: "Cardiff University",
  //       noSitesManaged: 3,
  //       role: "facility energy manager"
  //     },
  //     {
  //       userId: 2,
  //       firstName: "Johnny",
  //       lastName: "Bravo",
  //       email: "johnny.bravo@nhs.gov.uk",
  //       organisation: "National Health Service",
  //       noSitesManaged: 7,
  //       role: "director of estates"
  //     },
  //     {
  //       userId: 3,
  //       firstName: "Cai",
  //       lastName: "Robert",
  //       email: "cairobert@e2s.co.uk",
  //       organisation: "Empowering Energy Solutions",
  //       noSitesManaged: 0,
  //       role: "administrator"
  //     }
  //   ];
  //   mockedAxios.get.mockResolvedValue({
  //     data: mUser
  //   });

  //   it('should return correct list of users when function is called', async () => {
  //     // When
  //     const result = await mockService.getAllUserManagements();

  //     // Then
  //     expect(result).toEqual(mUser);

  //     expect(axios.get).toHaveBeenCalledTimes(1);
  //     expect(axios.get).toHaveBeenCalledWith("/api/user-managements");
  //   });
  // });
});
