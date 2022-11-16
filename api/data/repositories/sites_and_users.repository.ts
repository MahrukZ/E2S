import { connect } from "../config/db.config";
import { SitesAndUsers, ISitesAndUsers } from "../models/sites_and_users.model";

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

    async getAllSitesAndUsers(): Promise<ISitesAndUsers> {
        let data = {};
        try {
            data = await this.sitesAndUsersRepository.findAll();
        } catch (err) {
            console.error(err);
            throw (err);
        }
        return data;
    }

    async findSitesAndUsersByUserId(userId: number): Promise<ISitesAndUsers[]> {

        let data = [];

        try {
            data = await this.sitesAndUsersRepository.findAll({
                where: {
                    user_id: userId,
                  }
              });

        } catch (err) {
            console.error(err);
            throw (err);
        }

        return data;

    }
}