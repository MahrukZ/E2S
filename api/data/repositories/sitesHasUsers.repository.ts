import { connect } from "../config/db.config";
import { SitesHasUsers, ISiteHasUser } from "../models/sitesHasUsers.model";

export class SitesHasUsersRepository {
    private db: any = {};
    private sitesHasUsersRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({})
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string }) => {
                console.log("Failed to sync db: " + err.message);
            });
        this.sitesHasUsersRepository =
            this.db.Sequelize.getRepository(SitesHasUsers);
    }

    async createSitesHasUsers(
        sitesHasUsers: ISiteHasUser
    ): Promise<ISiteHasUser[]> {
        let data = [];
        try {
            data = await this.sitesHasUsersRepository.create(sitesHasUsers);
        } catch (err) {
            throw new Error("Failed to create sites has users." || err);
        }
        return data;
    }
}
