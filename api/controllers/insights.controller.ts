import { InsightService } from "../services/insights.service";

export class InsightController {
    private insightService: InsightService;

    constructor() {
        this.insightService = new InsightService();
    }

    async getInsights() {
        return await this.insightService.getInsights();
    }

    async createInsight(insight: any) {
        return await this.insightService.createInsight(insight);
    }

    async deleteInsight(insightId: number) {
        return await this.insightService.deleteInsight(insightId);
    }

    async updateInsight(insight: any) {
        return await this.insightService.updateInsight(insight);
    }
}