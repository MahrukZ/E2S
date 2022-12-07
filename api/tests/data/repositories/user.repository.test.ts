import { UserRepository } from "../../../data/repositories/users.repository";
import { Users, IUser } from "../../../data/models/users.model";

describe("UserRepository", () => {
  const userRepository = new UserRepository();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("UserManagementRepository.getAllUsers", () => {
    it("should fetch all users when there is data in the database", async () => {
      // Given
      const mockResponse: IUser[] = [
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
      Users.findAll = jest.fn().mockResolvedValue(mockResponse);

      // When
      const result = await userRepository.getAllUsers();

      // Then
      expect(result).toEqual(mockResponse);
      expect(Users.findAll).toHaveBeenCalledTimes(1);
      expect(Users.findAll).toHaveBeenCalledWith();
    });

    it("should not fetch user data when there is no data in the database", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to fetch all users.");
      userRepository.getAllUsers = jest.fn().mockRejectedValue(mErrorMessage);

      // Then
      expect(userRepository.getAllUsers).rejects.toMatchObject(mErrorMessage);
      expect(userRepository.getAllUsers).toHaveBeenCalledTimes(1);
      expect(userRepository.getAllUsers).toHaveBeenCalledWith();
    });
  });

  describe("UserRepository.signIn", () => {
    it("should sign in when email and password is provided", async () => {
      // Given
      const email = "martinjames@cardiff.ac.uk";
      const password = "martin12345";
      const mockResponse: IUser = {
        userId: 1,
        firstName: "Martin",
        lastName: "James",
        email: "martinjames@cardiff.ac.uk",
        role: "director of estates",
        password:
          "$2a$10$JubOeS1ni5ZurQZ9Y3S/f.yLlhLdnSOcDWqYJbkWGYzXzzlat6aum",
        orgId: 1,
      };

      Users.findAll = jest.fn().mockResolvedValue(mockResponse);

      // When
      const result = await userRepository.signIn(email, password);

      // Then
      expect(result).toEqual(mockResponse);
      expect(Users.findAll).toHaveBeenCalledTimes(1);
      expect(Users.findAll).toBeCalledWith({
        where: {
          email: email,
        },
      });
    });

    it("should not sign in when there is no email and password provided", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to find user.");
      userRepository.signIn = jest.fn().mockRejectedValue(mErrorMessage);

      // Then
      expect(userRepository.signIn).rejects.toMatchObject(mErrorMessage);
      expect(userRepository.signIn).toHaveBeenCalledTimes(1);
      expect(userRepository.signIn).toHaveBeenCalledWith();
    });
  });
});
