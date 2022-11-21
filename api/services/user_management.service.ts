import { IUserManagement } from "../data/models/user_management.model";
import { UserManagementRepository } from "../data/repositories/user_management.repository";

export class UserManagementService {
    private userManagementRepository: UserManagementRepository;

    constructor() {
        this.userManagementRepository = new UserManagementRepository();
    }

    async getAllUserManagements() {
        return await this.userManagementRepository.getAllUserManagements();
    }

    async findUserManagementByUserId(userId: number) {
        return await this.userManagementRepository.findUserManagementByUserId(userId);
    }

}