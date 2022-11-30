import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IUserManagement {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    organisation?: string;
    noSitesManaged?: number;
    role?: string;
}

@Table({ tableName: 'user_management', underscored: true })
export class UserManagement extends Model implements IUserManagement {

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
    organisation?: string;

    @Column({ 
        type: DataType.INTEGER, 
    })
    noSitesManaged?: number;

    @Column({ 
        type: DataType.STRING, 
    })
    role?: string;
}