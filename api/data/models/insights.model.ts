import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({ tableName: 'insight_templates' })
export class Insights extends Model {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    insight_id!: number;

    @Column({ 
        type: DataType.STRING, 
    })
    description!: string;
}