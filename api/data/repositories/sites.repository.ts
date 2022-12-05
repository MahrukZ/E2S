import { connect } from "../config/db.config";
import { Sites, ISite } from "../models/sites.model";

export class SiteRepository {
    private db: any = {};
    private siteRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({}) 
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string; }) => {
                console.log("Failed to sync db: " + err.message);
            });   
        this.siteRepository = this.db.Sequelize.getRepository(Sites);
    }

    //Unused Methods
    // async createSite(site: ISite): Promise<ISite> {
    //     let data = {};
    //     try {
    //         data = await this.siteRepository.create(site);
    //     } catch(err) {
    //         throw new Error("Failed to create site." || err);
    //     }
    //     return data;
    // }

    // async deleteSite(siteId: number): Promise<ISite> {
    //     let data = {};
    //     try {
    //         data = await this.siteRepository.destroy({
    //             where: {
    //                 site_id: siteId
    //             }
    //         });
    //     } catch(err) {
    //         throw new Error("Failed to delete site." || err);
    //     }
    //     return data;
    // }

    // async getAllSites(): Promise<ISite[]> {
    //     let data = [];
    //     try {
    //         data = await this.siteRepository.findAll();
    //     } catch (err) {
    //         throw new Error("Failed to get all sites." || err);
    //     }
    //     return data;
    // }

    // async updateSite(site: ISite): Promise<ISite> {
    //     let data = {};
    //     try {
    //         data = await this.siteRepository.update({...site}, {
    //             where: {
    //                 site_id: site.siteId
    //             }
    //         });
    //     } catch(err) {
    //         console.error(err);
    //         throw (err);
    //     }
    //     return data;
    // }

    async findSiteById(siteId: number): Promise<ISite> {
        let data = [];
        try {
            data = await this.siteRepository.findAll({
                where: {
                    siteId
                  }
              });
        } catch (err) {
            throw new Error("Failed to get sites and users." || err);
        }
        return data;
    }
}