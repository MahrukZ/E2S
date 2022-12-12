import { ISitesAndUser } from "../data/models/sitesAndUsers.model";
import { SitesAndUsersRepository } from "../data/repositories/sitesAndUsers.repository";

export class SitesAndUsersService {
    private sitesAndUsersRepository: SitesAndUsersRepository;

    constructor() {
        this.sitesAndUsersRepository = new SitesAndUsersRepository();
    }

    async getAllSitesAndUsers() {
        return await this.sitesAndUsersRepository.getAllSitesAndUsers();
    }

    async findSitesAndUsersByUserId(userId: number) {
        return await this.sitesAndUsersRepository.findSitesAndUsersByUserId(
            userId
        );
    }

    async createSitesAndUsers(sitesAndUsers: ISitesAndUser) {
        return await this.sitesAndUsersRepository.createSitesAndUsers(
            sitesAndUsers
        );
    }
}
