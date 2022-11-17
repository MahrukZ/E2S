import { ISitesAndUsers } from "../data/models/sites_and_users.model";
import { SitesAndUsersRepository } from "../data/repositories/sites_and_users.repository";

export class SitesAndUsersService {
    private sitesAndUsersRepository: SitesAndUsersRepository;

    constructor() {
        this.sitesAndUsersRepository = new SitesAndUsersRepository();
    }

    async getAllSitesAndUsers() {
        return await this.sitesAndUsersRepository.getAllSitesAndUsers();
    }

    async findSitesAndUsersByUserId(userId: number) {
        return await this.sitesAndUsersRepository.findSitesAndUsersByUserId(userId);
    }

}