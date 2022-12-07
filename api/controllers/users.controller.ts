import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<any> {
    return this.userService
      .getAllUsers()
      .then((data) => {
        res.status(200).json({
          message: "Success",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "server error: failed to fetch user data.",
          status: 500,
        });
      });
  }

  async signIn(req: Request, res: Response): Promise<any> {
    return this.userService
      .signIn(req.body.email, req.body.password)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "server error: failed to fetch user.",
          status: 500,
        });
      });
  }
}
