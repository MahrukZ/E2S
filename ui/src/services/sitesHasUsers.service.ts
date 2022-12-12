import axios from "axios";

export class SitesHasUsersService {
    public async createSitesHasUsers(sitesHasUsers: any): Promise<any> {
        const response = await axios.post(
            "/api/sites-has-users",
            sitesHasUsers
        );
        return await response.data;
    }
}
