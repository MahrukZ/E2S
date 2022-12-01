import { UserRepository } from "../data/repositories/users.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async findUserByEmailAndPassword(email: string, password: string) {
        return await this.userRepository.findUserByEmailAndPassword(email, password);
    }
}