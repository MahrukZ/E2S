import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISitesAndUser {
    siteId?: number;
    name?: string;
    userId?: number;
}

@Table({ tableName: 'sites_and_users' })
export class SitesAndUsers extends Model implements ISitesAndUser {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    siteId?: number; 

    @Column({ 
        type: DataType.STRING, 
    })
    name?: string;

    @Column({ 
        type: DataType.INTEGER
    })
    userId?: number;
}