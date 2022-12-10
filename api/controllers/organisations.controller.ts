import { Request, Response } from "express";
import { OrganisationService } from "../services/organisations.service";

export class OrganisationController {
    private organisationService: OrganisationService;

    constructor() {
        this.organisationService = new OrganisationService();
    }

    async createOrganisation(req: Request, res: Response): Promise<any> {
        return this.organisationService
            .createOrganisation(req.body)
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
                        "server error: failed to create organisation.",
                    status: 500,
                });
            });
    }

    async deleteOrganisation(req: Request, res: Response): Promise<any> {
        return this.organisationService
            .deleteOrganisation(parseInt(req.params.id))
            .then((data) => {
                res.status(202).json({
                    message: `Successfully deleted 1 record.`,
                    status: 202,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message:
                        err.message ||
                        "server error: failed to delete organisation.",
                    status: 500,
                });
            });
    }

    async getAllOrganisations(req: Request, res: Response): Promise<any> {
        return this.organisationService
            .getAllOrganisations()
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
                        "server error: failed to fetch organisations.",
                    status: 500,
                });
            });
    }

    async updateOrganisation(req: Request, res: Response): Promise<any> {
        return this.organisationService
            .updateOrganisation(req.body)
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
                        "server error: failed to update organisation.",
                    status: 500,
                });
            });
    }
}
