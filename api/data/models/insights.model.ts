import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'insight_templates' })
export class Insights extends Model {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER 
    })
    insight_id!: number;

    @Column({ 
        type: DataTypes.STRING, 
    })
    insight!: string;
}