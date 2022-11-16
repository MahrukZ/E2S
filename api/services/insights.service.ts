import { IInsight } from "../data/models/insights.model";
import { InsightRepository } from "../data/repositories/insights.repository";

export class InsightService {
    private insightRepository: InsightRepository;

    constructor() {
        this.insightRepository = new InsightRepository();
    }

    async createInsight(insight: IInsight) {
        return await this.insightRepository.createInsight(insight);
    }

    async deleteInsight(insightId: number) {
        return await this.insightRepository.deleteInsight(insightId);
    }

    async getAllInsights() {
        return await this.insightRepository.getAllInsights();
    }

    async updateInsight(insight: IInsight) {
        return await this.insightRepository.updateInsight(insight);
    }
}