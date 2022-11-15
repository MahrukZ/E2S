import { InsightService } from "../services/insights.service";

export class InsightController {
    private insightService: InsightService;

    constructor() {
        this.insightService = new InsightService();
    }

    async createInsight(insight: any) {
        return await this.insightService.createInsight(insight);
    }

    async deleteInsight(insightId: number) {
        return await this.insightService.deleteInsight(insightId);
    }

    async getAllInsights() {
        return await this.insightService.getAllInsights();
    }

    async updateInsight(insight: any) {
        return await this.insightService.updateInsight(insight);
    }
}