import { ISiteHasUser } from "../data/models/sitesHasUsers.model";
import { SitesHasUsersRepository } from "../data/repositories/sitesHasUsers.repository";

export class SitesHasUsersService {
    private sitesHasUsersRepository: SitesHasUsersRepository;

    constructor() {
        this.sitesHasUsersRepository = new SitesHasUsersRepository();
    }

    async createSitesHasUsers(sitesHasUsers: ISiteHasUser) {
        return await this.sitesHasUsersRepository.createSitesHasUsers(
            sitesHasUsers
        );
    }
}
