import { Request, Response } from "express";
import { SiteService } from "../services/sites.service";

export class SiteController {
    private siteService: SiteService;

    constructor() {
        this.siteService = new SiteService();
    }

    async createSite(req: Request, res: Response) {
        this.siteService.createSite(req.body)
        .then(data => res.status(201).send({
            message: 'Created',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to create site.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

    async deleteSite(req: Request, res: Response) {
        this.siteService.deleteSite(parseInt(req.params.id))
        .then(data => res.status(202).send({
            message: `Successfully deleted ${data} record.`,
            'status': res.statusCode,
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to delete Site.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

    async getAllSites(req: Request, res: Response) {
        this.siteService.getAllSites()
        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch sites.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

    async updateSite(req: Request, res: Response) {
        this.siteService.updateSite(req.body)
        .then(data => res.status(200).send({
            message: `Successfully updated ${data} record.`,
            'status': res.statusCode
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to update site.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }
}
