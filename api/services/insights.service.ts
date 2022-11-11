import { InsightRepository } from "../data/repositories/insights.repository";

export class InsightService {
    private insightRepository: InsightRepository;

    constructor() {
        this.insightRepository = new InsightRepository();
    }

    async getInsights() {
        return await this.insightRepository.getInsights();
    }

    async createInsight(insight: any) {
        return await this.insightRepository.createInsight(insight);
    }

    async deleteInsight(insightId: number) {
        return await this.insightRepository.deleteInsight(insightId);
    }

    async updateInsight(insight: any) {
        return await this.insightRepository.updateInsight(insight);
    }
}