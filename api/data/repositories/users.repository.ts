import bcrypt from "bcrypt";
import { connect } from "../config/db.config";
import { IUser, Users } from "../models/users.model";

export class UserRepository {
    private db: any = {};
    private userRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({})
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string }) => {
                console.log("Failed to sync db: " + err.message);
            });
        this.userRepository = this.db.Sequelize.getRepository(Users);
    }

    async getAllUsers(): Promise<IUser[]> {
        let data = [];
        try {
            data = await this.userRepository.findAll();
        } catch (err) {
            throw new Error("Failed to get users." || err);
        }
        return data;
    }

    async signIn(email: string, password: string): Promise<IUser> {
        let data = [];
        try {
            data = await this.userRepository.findAll({
                where: {
                    email: email,
                },
            });
        } catch (err) {
            throw new Error("Failed to find user" || err);
        }
        if (data.length > 0) {
            const auth = await bcrypt.compare(password, data[0].password);
            if (auth) {
                return data;
            } else {
                data = [];
            }
        }
        return data;
    }

    async findUserByEmail(email: string): Promise<IUser> {
        let data = [];
        try {
            data = await this.userRepository.findAll({
                where: {
                    email,
                },
            });
        } catch (err) {
            throw new Error("Failed to find user" || err);
        }
        return data;
    }

    async createUser(user: IUser): Promise<IUser> {
        let data = {};
        try {
            data = await this.userRepository.create(user);
        } catch (err) {
            throw new Error("Failed to create user." || err);
        }
        return data;
    }

    async deleteUser(userId: number): Promise<IUser> {
        let data = {};
        try {
            data = await this.userRepository.destroy({
                where: {
                    user_id: userId,
                },
            });
        } catch (err) {
            throw new Error("Failed to delete user." || err);
        }
        return data;
    }

    async updateUser(user: IUser): Promise<IUser> {
        let data = {};
        try {
            data = await this.userRepository.update(
                { ...user },
                {
                    where: {
                        user_id: user.userId,
                    },
                }
            );
        } catch (err) {
            throw new Error("Failed to update user." || err);
        }
        return data;
    }
}
