import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IConsumption {
    consumption_id?: number;
    time_interval?: Date;
    heat_demand?: number;
    electricity_demand?: number;
    electricity_price?: number;
    gas_price?: number;
    site_id?: number;
    org_id?: number;
}

@Table({ tableName: 'consumptions' })
export class Consumptions extends Model implements IConsumption {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    consumption_id?: number; 

    @Column({ 
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    time_interval?: Date;

    @Column({ 
        type: DataType.INTEGER
    })
    heat_demand?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    electricity_demand?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    electricity_price?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    gas_price?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    site_id?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    org_id?: number;
}
