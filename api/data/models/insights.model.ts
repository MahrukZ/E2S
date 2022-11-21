import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IInsight {
    insight_id?: number;
    description?: string;
}

@Table({ tableName: 'insight_templates' })
export class Insights extends Model implements IInsight {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    insight_id?: number;

    @Column({ 
        type: DataType.STRING, 
    })
    description?: string;
}