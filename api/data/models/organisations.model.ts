import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IOrganisation {
    orgId?: number;
    name?: string;
    logoId?: number;
}

@Table({ tableName: "organisations" })
export class Organisations extends Model implements IOrganisation {
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    orgId?: number;

    @Column({
        type: DataType.STRING,
    })
    name?: string;

    @Column({
        type: DataType.INTEGER,
    })
    logoId?: number;
}
