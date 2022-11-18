import { connect } from "../config/db.config";
import { Insights, IInsight } from "../models/insights.model";

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

    async createInsight(insight: IInsight): Promise<IInsight> {
        let data = {};
        try {
            data = await this.insightRepository.create(insight);
        } catch(err) {
            console.error(err);
            throw (err);
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
            throw new Error("Failed to delete insight." || err);
        }
        return data;
    }

    async getAllInsights(): Promise<IInsight[]> {
        let data = [];
        try {
            data = await this.insightRepository.findAll();
        } catch (err) {
            throw new Error("Failed to fetch all insights.");
        }
        return data;
    }

    async updateInsight(insight: IInsight): Promise<IInsight> {
        let data = {};
        try {
            data = await this.insightRepository.update({...insight}, {
                where: {
                    insight_id: insight.insight_id
                }
            });
        } catch(err) {
            console.error(err);
            throw (err);
        }
        return data;
    }
}