import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IConsumption {
    consumptionId?: number;
    timeInterval?: Date;
    heatDemand?: number;
    electricityDemand?: number;
    co2Emissions?: number;
    electricityPrice?: number;
    gasPrice?: number;
    siteId?: number;
    orgId?: number;
}

@Table({ tableName: 'consumptions', underscored: true })
export class Consumptions extends Model implements IConsumption {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    consumptionId?: number; 

    @Column({ 
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    timeInterval?: Date;

    @Column({ 
        type: DataType.FLOAT
    })
    heatDemand?: number;

    @Column({ 
        type: DataType.FLOAT
    })
    electricityDemand?: number;

    @Column({ 
        type: DataType.FLOAT
    })
    co2Emissions?: number;

    @Column({ 
        type: DataType.DECIMAL(19,2)
    })
    electricityPrice?: number;

    @Column({ 
        type: DataType.DECIMAL(19,2)
    })
    gasPrice?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    siteId?: number;

    @Column({ 
        type: DataType.INTEGER
    })
    orgId?: number;
}