import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Insights } from "../models/insights.model";
import { Sites } from "../models/sites.model";

dotenv.config();

export const connect = () => {
    const host = process.env.DB_HOST;
    const database = process.env.DB_DATABASE!;
    const user = process.env.DB_USER!;
    const password = process.env.DB_PASSWORD;
    const dialect:any = process.env.DB_DIALECT;

    const sequelize = new Sequelize(database, user, password, {
        host, 
        dialect,
        repositoryMode: true,
        define: {
            timestamps: false
        }
    });

    sequelize.addModels([Insights]);
    sequelize.addModels([Sites]);

    const db:any = {};
    db.Sequelize = Sequelize;
    db.Sequelize = sequelize;

    return db;
}