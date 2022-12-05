import { Request, Response } from "express";
import { ConsumptionService } from "../services/consumptions.service";

export class ConsumptionController {
    private consumptionService: ConsumptionService;

    constructor() {
        this.consumptionService = new ConsumptionService();
    }

    async bulkCreateConsumptions(req: Request, res: Response): Promise<any> {
        return (this.consumptionService.bulkCreateConsumptions(req.body)
            .then(data => {
                res.status(201).json({
                    message: 'Created',
                    status: 201,
                    data
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "server error: failed to bulk create consumptions.",
                    status: 500
                });
            })
        );
    };

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

    async findAllConsumptionsBySiteAndTime(req: Request, res: Response): Promise<any> {
        return (this.consumptionService.findAllConsumptionsBySiteAndTime(req.params.start, req.params.end, parseInt(req.params.id))
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
    
    async findSumOfConsumptionsBySiteIdAndTime(req: Request, res: Response): Promise<any> {
        return (this.consumptionService.findSumOfConsumptionsBySiteIdAndTime(req.params.start, req.params.end, parseInt(req.params.id))
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