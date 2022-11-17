import { Request, Response } from "express";
import { SitesAndUsersService } from "../services/sites_and_users.service";

export class SitesAndUsersController {
    private sitesAndUsersService: SitesAndUsersService;

    constructor() {
        this.sitesAndUsersService = new SitesAndUsersService();
    }

    async getAllSitesAndUsers(req: Request, res: Response) {
        this.sitesAndUsersService.getAllSitesAndUsers()
        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch sites and users.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

    async findSitesAndUsersByUserId(req: Request, res: Response) {

        this.sitesAndUsersService.findSitesAndUsersByUserId(parseInt(req.params.id))

        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))

        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch sites and users.",
                'status': res.statusCode
            });
            console.error(err);
        });

    }
}
