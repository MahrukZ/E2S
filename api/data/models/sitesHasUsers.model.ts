import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISiteHasUser {
    siteId?: number;
    userId?: number;
}

@Table({ tableName: "sites_has_users" })
export class SitesHasUsers extends Model implements ISiteHasUser {
    @Column({
        type: DataType.INTEGER,
    })
    siteId?: number;

    @Column({
        type: DataType.INTEGER,
    })
    userId?: number;
}
