import axios from "axios";
import { ISite } from "../components/pages/admin/siteManagement/SiteTable";

export class SitesService {
    public async getSites(): Promise<any> {
        const response = await axios.get("/api/sites");
        return await response.data;
    }
    public async findSiteById(siteId: number): Promise<any> {
        const response = await axios.get(`/api/site/${siteId}`);
        return await response.data;
    }

    public async deleteSite(siteId: number): Promise<any> {
        const response = await axios.delete(`/api/delete-site/${siteId}`);
        return await response.data;
    }

    public async createSite(site: ISite): Promise<any> {
        const response = await axios.post(`/api/site`, site);
        return await response.data;
    }

    public async updateSite(site: ISite): Promise<any> {
        const response = await axios.put(`/api/site`, site);
        return await response.data;
    }
}
