import { ISite } from "../../data/models/sites.model";
import { SiteRepository } from "../../data/repositories/sites.repository";
import { SiteService } from "../../services/sites.service";

jest.mock('../../data/repositories/sites.repository', () => {
    const mSiteRepo = { 
        findSiteById: jest.fn()
    };
    return {
        SiteRepository: jest.fn(() => mSiteRepo)
    };
});

describe('SiteService', () => {
    const repository = new SiteRepository();
    const service = new SiteService();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SiteService.findSiteById', () => {
        it('should find site by id', async () => {
            // Given
            const mSite: ISite = 
                {
                    siteId: 1,
                    name: "Abacws",
                    location: "Cathays",
                    orgId: 1
                };
            const siteId = 1;
            const fetchSpy = jest
                .spyOn(repository, 'findSiteById')
                .mockResolvedValue(mSite);

            // When
            const result = await service.findSiteById(siteId);

            // Then
            expect(result).toEqual(mSite);
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(fetchSpy).toHaveBeenCalledWith(siteId);
        });
    });

});