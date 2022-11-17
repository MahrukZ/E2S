import axios from "axios"

export class SitesAndUsersService {

    public async findSitesAndUsersByUserId(userId: number): Promise<any> {
        const response = await axios.get(`/api/sites_and_users/${userId}`);
        return await response.data;
    }
}