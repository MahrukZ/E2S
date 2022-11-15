import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface ISite {
    site_id?: number;
    name?: string;
    location?: string;
    org_id?: number;
}

@Table({ tableName: 'sites' })
export class Sites extends Model implements ISite {

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
        type: DataType.STRING, 
    })
    location?: string;
    
    @Column({ 
        type: DataType.INTEGER
    })
    org_id?: number;
}