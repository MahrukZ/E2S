import { Request, Response } from "express";
import { SitesAndUsersService } from "../services/sitesAndUsers.service";

export class SitesAndUsersController {
    private sitesAndUsersService: SitesAndUsersService;

    constructor() {
        this.sitesAndUsersService = new SitesAndUsersService();
    }

    async getAllSitesAndUsers(req: Request, res: Response) {
        return this.sitesAndUsersService
            .getAllSitesAndUsers()
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
                        "server error: failed to fetch sites and users.",
                    status: 500,
                });
            });
    }

    async findSitesAndUsersByUserId(req: Request, res: Response): Promise<any> {
        return this.sitesAndUsersService
            .findSitesAndUsersByUserId(parseInt(req.params.id))
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
                        "server error: failed to fetch sites and users.",
                    status: 500,
                });
            });
    }

    async createSitesAndUsers(req: Request, res: Response): Promise<any> {
        return this.sitesAndUsersService
            .createSitesAndUsers(req.body)
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
                        err.message ||
                        "server error: failed to create sites and users.",
                    status: 500,
                });
            });
    }
}
