import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISitesAndUsers {
    site_id?: number;
    name?: string;
    user_id?: number;
}

@Table({ tableName: 'sites_and_users' })
export class SitesAndUsers extends Model implements ISitesAndUsers {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    site_id?: number; 

    @Column({ 
        type: DataType.STRING, 
    })
    name?: string;

    @Column({ 
        type: DataType.INTEGER
    })
    user_id?: number;
}