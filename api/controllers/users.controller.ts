import { Request, Response } from "express";
import { UserService } from "../services/users.service";

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
                    message:
                        err.message ||
                        "server error: failed to fetch user data.",
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
                    message:
                        err.message ||
                        "server error: failed to fetch user data.",
                    status: 500,
                });
            });
    }

    async createUser(req: Request, res: Response): Promise<any> {
        return this.userService
            .createUser(req.body)
            .then((data) => {
                res.status(201).json({
                    message: "Created",
                    status: 201,
                    data,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message:
                        err.message || "server error: failed to create user.",
                    status: 500,
                });
            });
    }

    async deleteUser(req: Request, res: Response): Promise<any> {
        return this.userService
            .deleteUser(parseInt(req.params.id))
            .then((data) => {
                res.status(202).json({
                    message: `Successfully deleted 1 record.`,
                    status: 202,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message:
                        err.message || "server error: failed to delete user.",
                    status: 500,
                });
            });
    }

    async updateUser(req: Request, res: Response): Promise<any> {
        return this.userService
            .updateUser(req.body)
            .then((data) => {
                res.status(200).json({
                    message: `Successfully updated 1 record.`,
                    status: 200,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message:
                        err.message ||
                        "server error: failed to update user.",
                    status: 500,
                });
            });
    }
}
