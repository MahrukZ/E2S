import { IUserManagement } from "../data/models/userManagement.model";
import { UserManagementRepository } from "../data/repositories/userManagement.repository";

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