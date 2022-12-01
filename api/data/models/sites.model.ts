import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISite {
    siteId?: number;
    name?: string;
    location?: string;
    orgId?: number;
}

@Table({ tableName: 'sites' })
export class Sites extends Model implements ISite {

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
        type: DataType.STRING, 
    })
    location?: string;
    
    @Column({ 
        type: DataType.INTEGER
    })
    orgId?: number;
}