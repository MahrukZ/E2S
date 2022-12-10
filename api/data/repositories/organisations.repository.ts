import { connect } from "../config/db.config";
import { Organisations, IOrganisation } from "../models/organisations.model";

export class OrganisationRepository {
    private db: any = {};
    private organisationRepository: any;

    constructor() {
        this.db = connect();
        this.db.Sequelize.sync({})
            .then(() => {
                console.log("Sync db.");
            })
            .catch((err: { message: string }) => {
                console.log("Failed to sync db: " + err.message);
            });
        this.organisationRepository =
            this.db.Sequelize.getRepository(Organisations);
    }

    async createOrganisation(org: IOrganisation): Promise<IOrganisation> {
        let data = {};
        try {
            data = await this.organisationRepository.create(org);
        } catch (err) {
            throw new Error("Failed to create organisation." || err);
        }
        return data;
    }

    async deleteOrganisation(orgId: number) {
        let data = {};
        try {
            data = await this.organisationRepository.destroy({
                where: {
                    org_id: orgId,
                },
            });
        } catch (err) {
            throw new Error("Failed to delete organisation." || err);
        }
        return data;
    }

    async getAllOrganisations(): Promise<IOrganisation[]> {
        let data = [];
        try {
            data = await this.organisationRepository.findAll();
        } catch (err) {
            throw new Error("Failed to fetch all organisations." || err);
        }
        return data;
    }

    async updateOrganisation(org: IOrganisation): Promise<IOrganisation> {
        let data = {};
        try {
            data = await this.organisationRepository.update(
                { ...org },
                {
                    where: {
                        org_id: org.orgId,
                    },
                }
            );
        } catch (err) {
            throw new Error("Failed to update organisation." || err);
        }
        return data;
    }
}
