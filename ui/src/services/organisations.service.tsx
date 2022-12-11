import axios from "axios";
import { IOrganisation } from "../components/pages/admin/siteManagement/Organisations";

export class OrganisationsService {
    public async createOrganisation(org: IOrganisation): Promise<any> {
        const response = await axios.post(`/api/organisation`, org);
        return await response.data;
    }

    public async deleteOrganisation(orgId: number): Promise<any> {
        const response = await axios.delete(`/api/organisation/${orgId}`);
        return await response.data;
    }

    public async getAllOrganisations(): Promise<any> {
        const response = await axios.get("/api/organisations");
        return await response.data;
    }

    public async updateOrganisation(org: IOrganisation): Promise<any> {
        const response = await axios.put(`/api/organisation`, org);
        return await response.data;
    }
}
