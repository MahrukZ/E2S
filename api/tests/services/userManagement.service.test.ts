import { IUserManagement } from "../../data/models/userManagement.model";
import { UserManagementRepository } from "../../data/repositories/userManagement.repository";
import { UserManagementService } from "../../services/userManagement.service";

jest.mock("../../data/repositories/userManagement.repository", () => {
  const mUserManagementRepo = {
    getAllUserManagements: jest.fn(),
    findUserManagementByUserId: jest.fn(),
  };
  return {
    UserManagementRepository: jest.fn(() => mUserManagementRepo),
  };
});

describe("UserManagementService", () => {
  const repository = new UserManagementRepository();
  const service = new UserManagementService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("UserManagementService.getAllUserManagements", () => {
    it("should return all user managements", async () => {
      // Given
      const mUserManagement: IUserManagement[] = [
        {
          userId: 1,
          firstName: "Rhys",
          lastName: "Jones",
          email: "rhys.jones@cardiff.ac.uk",
          organisation: "Cardiff University",
          noSitesManaged: 3,
          role: "facility energy manager",
        },
        {
          userId: 2,
          firstName: "Johnny",
          lastName: "Bravo",
          email: "johnny.bravo@nhs.gov.uk",
          organisation: "National Health Service",
          noSitesManaged: 7,
          role: "director of estates",
        },
        {
          userId: 3,
          firstName: "Cai",
          lastName: "Robert",
          email: "cairobert@e2s.co.uk",
          organisation: "Empowering Energy Solutions",
          noSitesManaged: 0,
          role: "administrator",
        },
      ];
      const getSpy = jest
        .spyOn(repository, "getAllUserManagements")
        .mockResolvedValue(mUserManagement);

      // When
      const result = await service.getAllUserManagements();

      // Then
      expect(result).toEqual(mUserManagement);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith();
    });
  });

  describe("UserManagementService.findUserManagementByUserId", () => {
    it("should find user managements by user id", async () => {
      // Given
      const mUserManagement: IUserManagement[] = [
        {
          userId: 1,
          firstName: "Rhys",
          lastName: "Jones",
          email: "rhys.jones@cardiff.ac.uk",
          organisation: "Cardiff University",
          noSitesManaged: 3,
          role: "facility energy manager",
        },
      ];
      const userId = 1;
      const fetchSpy = jest
        .spyOn(repository, "findUserManagementByUserId")
        .mockResolvedValue(mUserManagement);

      // When
      const result = await service.findUserManagementByUserId(userId);

      // Then
      expect(result).toEqual(mUserManagement);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(userId);
    });
  });
});
