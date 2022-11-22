import { Column, Model, Table, DataType } from "sequelize-typescript";

export interface IUserManagement {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    organisation?: string;
    no_sites_managed?: number;
    role?: string;
}

@Table({ tableName: 'user_management' })
export class UserManagement extends Model implements IUserManagement {

    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER 
    })
    user_id?: number;

    @Column({ 
        type: DataType.STRING, 
    })
    first_name?: string;

    @Column({ 
        type: DataType.STRING, 
    })
    last_name?: string;

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
    no_sites_managed?: number;

    @Column({ 
        type: DataType.STRING, 
    })
    role?: string;
}