import { Request, Response } from "express";
import { SiteManagementService } from "../services/siteManagement.service";

export class SiteManagementController {
    private siteManagementService: SiteManagementService;

    constructor() {
        this.siteManagementService = new SiteManagementService();
    }

    async getAllSiteManagements(req: Request, res: Response): Promise<any> {
        return this.siteManagementService
            .getAllSiteManagements()
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
                        "server error: failed to fetch site management data.",
                    status: 500,
                });
            });
    }
}
