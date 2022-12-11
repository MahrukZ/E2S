import { ISite } from "../data/models/sites.model";
import { SiteRepository } from "../data/repositories/sites.repository";

export class SiteService {
    private siteRepository: SiteRepository;

    constructor() {
        this.siteRepository = new SiteRepository();
    }

    // Unused methods
    // async createSite(site: ISite) {
    //     return await this.siteRepository.createSite(site);
    // }

    async deleteSite(siteId: number) {
        return await this.siteRepository.deleteSite(siteId);
    }

    async getAllSites() {
        return await this.siteRepository.getAllSites();
    }

    // async updateSite(site: ISite) {
    //     return await this.siteRepository.updateSite(site);
    // }

    async findSiteById(siteId: number) {
        return await this.siteRepository.findSiteById(siteId);
    }
}
