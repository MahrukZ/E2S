import { IUser } from "../../data/models/users.model";
import { UserRepository } from "../../data/repositories/users.repository";
import { UserService } from "../../services/users.service";

jest.mock("../../data/repositories/users.repository", () => {
  const mUserRepo = {
    getAllUsers: jest.fn(),
    signIn: jest.fn(),
  };
  return {
    UserRepository: jest.fn(() => mUserRepo),
  };
});

describe("UserService", () => {
  const repository = new UserRepository();
  const service = new UserService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("UserService.getAllUsers", () => {
    it("should return all users", async () => {
      // Given
      const mUser: IUser[] = [
        {
          userId: 1,
          firstName: "Martin",
          lastName: "James",
          email: "martinjames@cardiff.ac.uk",
          role: "director of estates",
          password:
            "$2a$10$JubOeS1ni5ZurQZ9Y3S/f.yLlhLdnSOcDWqYJbkWGYzXzzlat6aum",
          orgId: 1,
        },
        {
          userId: 2,
          firstName: "Rhy",
          lastName: "Jones",
          email: "rhyjones@cardiff.ac.uk",
          role: "facility energy manager",
          password:
            "$2a$10$OI1b4b4kzeU6qI8Dns3YGeKVvG.BBTGflE0tfzVd2WO4sQ/OC.sU.",
          orgId: 1,
        },
        {
          userId: 2,
          firstName: "James",
          lastName: "Ohay",
          email: "jamesohay@cardiff.ac.uk",
          role: "facility energy manager",
          password:
            "$2a$10$ZBYZscFZAnKVrUnWyUdr.OGr2p/ZjY4FkJ3T7abNKzqTYkvq6bz9S",
          orgId: 1,
        },
      ];
      const getSpy = jest
        .spyOn(repository, "getAllUsers")
        .mockResolvedValue(mUser);

      // When
      const result = await service.getAllUsers();

      // Then
      expect(result).toEqual(mUser);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith();
    });
  });

  describe("UserService.signIn", () => {
    it("should sign in user", async () => {
      // Given
      const mUser: IUser = {
        userId: 1,
        firstName: "Martin",
        lastName: "James",
        email: "martinjames@cardiff.ac.uk",
        role: "director of estates",
        password:
          "$2a$10$JubOeS1ni5ZurQZ9Y3S/f.yLlhLdnSOcDWqYJbkWGYzXzzlat6aum",
        orgId: 1,
      };
      const email = "martinjames@cardiff.ac.uk";
      const password = "martin12345";
      const signInSpy = jest
        .spyOn(repository, "signIn")
        .mockResolvedValue(mUser);

      // When
      const result = await service.signIn(email, password);

      // Then
      expect(result).toEqual(mUser);
      expect(signInSpy).toHaveBeenCalledTimes(1);
      expect(signInSpy).toHaveBeenCalledWith(email, password);
    });
  });
});
