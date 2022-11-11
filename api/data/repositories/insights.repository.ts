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
            console.log("insights: ", insight);
            return insight;
        } catch (err) {
            console.error(err);
            return ['Error: Failed to get insight data'];
        }
    }
}