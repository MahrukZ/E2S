import { Request, Response } from "express";
import { InsightService } from "../services/insights.service";

export class InsightController {
    private insightService: InsightService;

    constructor() {
        this.insightService = new InsightService();
    }

    async createInsight(req: Request, res: Response): Promise<any> {
        return (this.insightService.createInsight(req.body)
            .then(data => {
                res.status(201).json({
                    message: 'Created',
                    status: 201,
                    data
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "server error: failed to create insight.",
                    status: 500
                });
            })
        );
    };

    async deleteInsight(req: Request, res: Response): Promise<any> {
        return (this.insightService.deleteInsight(parseInt(req.params.id))
            .then(data => {
                res.status(202).json({
                    message: `Successfully deleted 1 record.`,
                    status: 202,
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "server error: failed to delete insight.",
                    status: 500
                });
            })
        );
    };

    async getAllInsights(req: Request, res: Response): Promise<any> {
        return (this.insightService.getAllInsights()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
            })
            .catch (err => {
                res.status(500).json({
                    message: err.message || "server error: failed to fetch insights.",
                    status: 500
                });
            })
        );
    };

    async updateInsight(req: Request, res: Response): Promise<any> {
        return (this.insightService.updateInsight(req.body)
            .then(data => {
                res.status(200).json({
                    message: `Successfully updated 1 record.`,
                    status: 200,
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "server error: failed to update insight.",
                    status: 500
                });
            })
        );
    };
}
