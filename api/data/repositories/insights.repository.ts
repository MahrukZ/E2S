import { connect } from "../config/db.config";
import { Insights } from "../models/insights.model";

export class InsightRepository {
    private db: any = {};
    private insightRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({}) 
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string; }) => {
                console.log("Failed to sync db: " + err.message);
            });   
        this.insightRepository = this.db.Sequelize.getRepository(Insights);
    }

    async getInsights() {
        try {
            const insight = await this.insightRepository.findAll();
            return insight;
        } catch (err) {
            console.error(err);
            return ['Error: Failed to connect to the repository'];
        }
    }

    async createInsight(insight: any) {
        let data = {};
        try {
            data = await this.insightRepository.create(insight);
        } catch(err) {
            console.error(err);
        }
        return data;
    }

    async deleteInsight(insightId: number) {
        let data = {};
        try {
            data = await this.insightRepository.destroy({
                where: {
                    insight_id: insightId
                }
            });
        } catch(err) {
            console.error(err);
        }
        return data;
    }


}