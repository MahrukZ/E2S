import axios from "axios";

export class SiteManagementService {
    public async getAllSiteManagements(): Promise<any> {
        const response = await axios.get("/api/site-managements");
        return await response.data;
    }
}
