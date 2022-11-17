import { Request, Response } from "express";
import { IInsight } from "../data/models/insights.model";
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
                    status: res.statusCode
                });
                console.log(err);
            })
        );
    };

    async deleteInsight(req: Request, res: Response) {
        this.insightService.deleteInsight(parseInt(req.params.id))
        .then(data => res.status(202).send({
            message: `Successfully deleted ${data} record.`,
            'status': res.statusCode,
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to delete insight.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

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
                res.status(500).send({
                    message: err.message || "server error: failed to fetch insights.",
                    status: res.statusCode
                });
                console.log(err);
            })
        );
    };

    async updateInsight(req: Request, res: Response) {
        this.insightService.updateInsight(req.body)
        .then(data => res.status(200).send({
            message: `Successfully updated ${data} record.`,
            'status': res.statusCode
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to update insight.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }
}