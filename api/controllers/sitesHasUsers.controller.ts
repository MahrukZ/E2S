import { Request, Response } from "express";
import { SitesHasUsersService } from "../services/sitesHasUsers.service";

export class SitesHasUsersController {
    private sitesHasUsersService: SitesHasUsersService;

    constructor() {
        this.sitesHasUsersService = new SitesHasUsersService();
    }

    async createSitesHasUsers(req: Request, res: Response): Promise<any> {
        return this.sitesHasUsersService
            .createSitesHasUsers(req.body)
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
                        "server error: failed to create sites has users.",
                    status: 500,
                });
            });
    }
}
