import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IUser {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    password?: string;
    orgId?: number;
}

@Table({ tableName: 'users', underscored: true })
export class Users extends Model implements IUser {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    userId?: number;

    @Column({ 
        type: DataType.STRING, 
    })
    firstName?: string;

    @Column({ 
        type: DataType.STRING, 
    })
    lastName?: string;

    @Column({ 
        type: DataType.STRING, 
    })
    email?: string;

    @Column({ 
        type: DataType.STRING, 
    })
    role?: string;

    @Column({ 
        type: DataType.INTEGER, 
    })
    password?: string;

    @Column({ 
        type: DataType.STRING, 
    })
    orgId?: number;
}