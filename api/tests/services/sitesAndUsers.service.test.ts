import { ISitesAndUser } from "../../data/models/sitesAndUsers.model";
import { SitesAndUsersRepository } from "../../data/repositories/sitesAndUsers.repository";
import { SitesAndUsersService } from "../../services/sitesAndUsers.service";

jest.mock("../../data/repositories/sitesAndUsers.repository", () => {
  const mSitesAndUsersRepo = {
    getAllSitesAndUsers: jest.fn(),
    findSitesAndUsersByUserId: jest.fn(),
  };
  return {
    SitesAndUsersRepository: jest.fn(() => mSitesAndUsersRepo),
  };
});

describe("SitesAndUsersService", () => {
  const repository = new SitesAndUsersRepository();
  const service = new SitesAndUsersService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("SitesAndUsersService.getAllSitesAndUsers", () => {
    it("should return all sites and users", async () => {
      // Given
      const mSitesAndUsers: ISitesAndUser[] = [
        {
          siteId: 1,
          name: "Abacws",
          userId: 1,
        },
        {
          siteId: 1,
          name: "Abacws",
          userId: 3,
        },
        {
          siteId: 2,
          name: "National Software Academy",
          userId: 1,
        },
      ];
      const getSpy = jest
        .spyOn(repository, "getAllSitesAndUsers")
        .mockResolvedValue(mSitesAndUsers);

      // When
      const result = await service.getAllSitesAndUsers();

      // Then
      expect(result).toEqual(mSitesAndUsers);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith();
    });
  });

  describe("SitesAndUsersService.findSitesAndUsersByUserId", () => {
    it("should find sites and users by user id", async () => {
      // Given
      const mSitesAndUsers: ISitesAndUser[] = [
        {
          siteId: 1,
          name: "Abacws",
          userId: 1,
        },
        {
          siteId: 2,
          name: "National Software Academy",
          userId: 1,
        },
      ];
      const userId = 1;
      const fetchSpy = jest
        .spyOn(repository, "findSitesAndUsersByUserId")
        .mockResolvedValue(mSitesAndUsers);

      // When
      const result = await service.findSitesAndUsersByUserId(userId);

      // Then
      expect(result).toEqual(mSitesAndUsers);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(userId);
    });
  });
});
