import { connect } from "../config/db.config";
import { SitesAndUsers, ISitesAndUser } from "../models/sitesAndUsers.model";

export class SitesAndUsersRepository {
    private db: any = {};
    private sitesAndUsersRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({}) 
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string; }) => {
                console.log("Failed to sync db: " + err.message);
            });   
        this.sitesAndUsersRepository = this.db.Sequelize.getRepository(SitesAndUsers);
    }

    async getAllSitesAndUsers(): Promise<ISitesAndUser[]> {
        let data = [];
        try {
            data = await this.sitesAndUsersRepository.findAll();
        } catch (err) {
            throw new Error("Failed to get sites and users." || err);
        }
        return data;
    }

    async findSitesAndUsersByUserId(userId: number): Promise<ISitesAndUser[]> {
        let data = [];
        try {
            data = await this.sitesAndUsersRepository.findAll({
                where: {
                    user_id: userId
                  }
              });
        } catch (err) {
            throw new Error("Failed to get sites and users." || err);
        }
        return data;
    }
}