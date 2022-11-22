import { Request, Response } from "express";
import { ConsumptionService } from "../services/consumptions.service";

export class ConsumptionController {
    private consumptionService: ConsumptionService;

    constructor() {
        this.consumptionService = new ConsumptionService();
    }

    async createConsumption(req: Request, res: Response): Promise<any> {
        return (this.consumptionService.createConsumption(req.body)
            .then(data => {
                res.status(201).json({
                    message: 'Created',
                    status: 201,
                    data
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "server error: failed to create a consumption.",
                    status: 500
                });
            })
        );
    };

    async getAllConsumptions(req: Request, res: Response): Promise<any> {
        return (this.consumptionService.getAllConsumptions()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
            })
            .catch (err => {
                res.status(500).json({
                    message: err.message || "server error: failed to fetch consumptions.",
                    status: 500
                });
            })
        );
    };
}