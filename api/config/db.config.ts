import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE!;
const user = process.env.DB_USER!;
const password = process.env.DB_PASSWORD;
const dialect:any = process.env.DB_DIALECT;

const sequelize = new Sequelize(database, user, password, {
    host, 
    dialect
});

const db:any = {};
db.Sequelize = Sequelize;
db.Sequelize = sequelize;
