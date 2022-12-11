import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISiteManagement {
    siteId?: number;
    name?: string;
    location?: string;
    orgId?: number;
    organisation?: string;
    numberOfUsers?: number;
}

@Table({ tableName: "site_management", underscored: true })
export class SiteManagement extends Model implements ISiteManagement {
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    siteId?: number;

    @Column({
        type: DataType.STRING,
    })
    name?: string;

    @Column({
        type: DataType.STRING,
    })
    location?: string;

    @Column({
        type: DataType.INTEGER,
    })
    orgId?: number;

    @Column({
        type: DataType.STRING,
    })
    organisation?: string;

    @Column({
        type: DataType.INTEGER,
    })
    numberOfUsers?: number;
}
