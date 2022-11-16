export class SitesAndUsersService {

    public async findSitesAndUsersByUserId(userId: number): Promise<any> {

        const response = await fetch(`/api/sites_and_users/${userId}`);

        return await response.json();

    }
}