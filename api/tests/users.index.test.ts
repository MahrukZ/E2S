import axios from "axios";
import { UserController } from "../controllers/users.controller";
import { IUser } from "../data/models/users.model";

jest.mock("axios");

jest.mock("../controllers/users.controller", () => {
  const mUserController = {
    getAllUsers: jest.fn(),
    signIn: jest.fn(),
  };
  return {
    UserController: jest.fn(() => mUserController),
  };
});

describe("index", () => {
  const controller = new UserController();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mRequest = (body?: any, params?: any) => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(body || req);
    req.params = jest.fn().mockReturnValue(params || req);
    return req;
  };
  const mResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users", () => {
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
    const mSuccessResponse: any = {
      message: "Success",
      status: 200,
      data: mUser,
    };
    mockedAxios.get.mockResolvedValue(mSuccessResponse);
    const req = mRequest();
    const res = mResponse();

    it("should fetch all users when there is data", async () => {
      // Given
      const mUrl = "/api/users";
      const getSpy = jest.spyOn(controller, "getAllUsers");

      // When
      const result = await axios.get(mUrl);
      await controller.getAllUsers(req, res);

      // Then
      expect(result).toEqual(mSuccessResponse);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(mUrl);

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith(req, res);
    });
  });
});
