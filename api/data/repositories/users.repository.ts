import { connect } from "../config/db.config";
import { Users, IUser } from "../models/users.model";

export class UserRepository {
    private db: any = {};
    private userRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({}) 
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string; }) => {
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

    async findUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
        let data = [];
        try {
            data = await this.userRepository.findAll({
                where: {
                    email: email,
                    password: password
                  }
              });
        } catch (err) {
            throw new Error("Failed to find user" || err);
        }
        return data;
    }

}