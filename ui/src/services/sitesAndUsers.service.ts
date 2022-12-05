import axios from "axios";

export class SitesAndUsersService {
  public async findSitesAndUsersByUserId(userId: number): Promise<any> {
    const response = await axios.get(`/api/sites-and-users/${userId}`);
    return await response.data;
  }
}
