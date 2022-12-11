import { IOrganisation } from "../data/models/organisations.model";
import { OrganisationRepository } from "../data/repositories/organisations.repository";

export class OrganisationService {
    private organisationRepository: OrganisationRepository;

    constructor() {
        this.organisationRepository = new OrganisationRepository();
    }

    async createOrganisation(org: IOrganisation) {
        return await this.organisationRepository.createOrganisation(org);
    }

    async deleteOrganisation(orgId: number) {
        return await this.organisationRepository.deleteOrganisation(orgId);
    }

    async getAllOrganisations() {
        return await this.organisationRepository.getAllOrganisations();
    }

    async updateOrganisation(org: IOrganisation) {
        return await this.organisationRepository.updateOrganisation(org);
    }
}
