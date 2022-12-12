import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Insights } from "../models/insights.model";
import { Sites } from "../models/sites.model";
import { SitesAndUsers } from "../models/sitesAndUsers.model";
import { UserManagement } from "../models/userManagement.model";
import { Consumptions } from "../models/consumptions.model";
import { Users } from "../models/users.model";
import { SiteManagement } from "../models/siteManagement.model";
import { Organisations } from "../models/organisations.model";
import { SitesHasUsers } from "../models/sitesHasUsers.model";

dotenv.config();

export const connect = () => {
    const host = process.env.DB_HOST;
    const database = process.env.DB_DATABASE!;
    const user = process.env.DB_USER!;
    const password = process.env.DB_PASSWORD;
    const dialect: any = process.env.DB_DIALECT;

    const sequelize = new Sequelize(database, user, password, {
        host,
        dialect,
        repositoryMode: true,
        define: {
            timestamps: false,
            underscored: true,
        },
    });

    sequelize.addModels([Insights]);
    sequelize.addModels([Sites]);
    sequelize.addModels([SitesAndUsers]);
    sequelize.addModels([SitesHasUsers]);
    sequelize.addModels([UserManagement]);
    sequelize.addModels([Consumptions]);
    sequelize.addModels([Users]);
    sequelize.addModels([SiteManagement]);
    sequelize.addModels([Organisations]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.Sequelize = sequelize;

    return db;
};
