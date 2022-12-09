import axios from "axios";
import "@testing-library/jest-dom";
import { UsersService } from "../../src/services/users.service";

jest.mock("axios");

describe("users.service", () => {
  const mockService = new UsersService();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should return correct consumptions when function is called", async () => {
    // Given
    const mUser = [
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
    mockedAxios.get.mockResolvedValue({
      data: mUser,
    });

    // When
    const result = await mockService.getAllUsers();

    // Then
    expect(result).toEqual(mUser);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/users");
  });
});
