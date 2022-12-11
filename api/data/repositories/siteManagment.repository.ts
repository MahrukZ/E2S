import { connect } from "../config/db.config";
import {
    SiteManagement,
    ISiteManagement,
} from "../models/siteManagement.model";

export class SiteManagementRepository {
    private db: any = {};
    private siteManagementRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({})
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string }) => {
                console.log("Failed to sync db: " + err.message);
            });
        this.siteManagementRepository =
            this.db.Sequelize.getRepository(SiteManagement);
    }

    async getAllSiteManagements(): Promise<ISiteManagement[]> {
        let data = [];
        try {
            data = await this.siteManagementRepository.findAll();
        } catch (err) {
            throw new Error("Failed to get site managements." || err);
        }
        return data;
    }
}
