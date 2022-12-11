import { SiteManagementRepository } from "../data/repositories/siteManagment.repository";

export class SiteManagementService {
    private siteManagementRepository: SiteManagementRepository;

    constructor() {
        this.siteManagementRepository = new SiteManagementRepository();
    }

    async getAllSiteManagements() {
        return await this.siteManagementRepository.getAllSiteManagements();
    }
}
