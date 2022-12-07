import { UserController } from "../../controllers/users.controller";
import { IUser } from "../../data/models/users.model";
import { UserService } from "../../services/users.service";

jest.mock("../../services/users.service", () => {
  const mUserService = {
    getAllUsers: jest.fn(),
    signIn: jest.fn(),
  };
  return {
    UserService: jest.fn(() => mUserService),
  };
});

describe("UserManagementController", () => {
  const service = new UserService();
  const controller = new UserController();

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

  describe("UserController.getAllUsers", () => {
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
    const mFailResponse: any = {
      message: "server error: failed to fetch user data.",
      status: 500,
    };

    it("should fetch all user data when there is data in the database", async () => {
      // Given
      const req = mRequest();
      const res = mResponse();
      const getSpy = jest
        .spyOn(service, "getAllUsers")
        .mockResolvedValueOnce(mUser);

      // When
      await controller.getAllUsers(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mSuccessResponse);

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith();
    });

    it("should not fetch user data when there is no data in the database", async () => {
      // Given
      const req = mRequest();
      const res = mResponse();
      const getSpy = jest.spyOn(service, "getAllUsers").mockRejectedValue({});

      // When
      await controller.getAllUsers(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(mFailResponse);

      expect(getSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("UserController.signIn", () => {
    const mUser: IUser = {
      userId: 1,
      firstName: "Martin",
      lastName: "James",
      email: "martinjames@cardiff.ac.uk",
      role: "director of estates",
      password: "$2a$10$JubOeS1ni5ZurQZ9Y3S/f.yLlhLdnSOcDWqYJbkWGYzXzzlat6aum",
      orgId: 1,
    };

    const mSuccessResponse: any = {
      message: "Success",
      status: 200,
      data: mUser,
    };
    const mFailResponse: any = {
      message: "server error: failed to fetch user data.",
      status: 500,
    };
    const mBody = {
      email: "martinjames@cardiff.ac.uk",
      password: "martin12345",
    };

    it("should sign in when body is provided", async () => {
      // Given
      const req = mRequest(mBody, "");
      const res = mResponse();
      const signInSpy = jest.spyOn(service, "signIn").mockResolvedValue(mUser);

      // When
      await controller.signIn(req, res);

      // Then
      expect(signInSpy).toHaveBeenCalledTimes(1);
    });

    it("should not sign in when body is not provided", async () => {
      // Given
      const req = mRequest();
      const res = mResponse();
      const signInSpy = jest.spyOn(service, "signIn").mockRejectedValue({});

      // When
      await controller.signIn(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(mFailResponse);

      expect(signInSpy).toHaveBeenCalledTimes(1);
    });
  });
});
