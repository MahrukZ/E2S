import { UserRepository } from "../data/repositories/users.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async signIn(email: string, password: string) {
        return await this.userRepository.signIn(email, password);
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email);
    }

    async deleteUser(userId: number) {
        return await this.userRepository.deleteUser(userId);
    }
}
