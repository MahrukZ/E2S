import { ISite } from "../../data/models/sites.model";
import { SiteRepository } from "../../data/repositories/sites.repository";
import { SiteService } from "../../services/sites.service";

jest.mock('../../data/repositories/sites.repository', () => {
    const mSiteRepo = { 
        findSiteById: jest.fn(),
        getAllSites: jest.fn()
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

      describe("SiteService.getAllSites", () => {
    it("should return all sites", async () => {
      // Given
      const mSites: ISite[] = [
                {
                    siteId: 1,
                    name: "Abacws",
                    location: "Cathays",
                    orgId: 1
                },
                {
                    siteId: 2,
                    name: "National Software Academy",
                    location: "Newport",
                    orgId: 1
                },
                {
                    siteId: 3,
                    name: "Queens Building",
                    location: "Cardiff",
                    orgId: 1
                }
      ];
      const getSpy = jest
        .spyOn(repository, "getAllSites")
        .mockResolvedValue(mSites);

      // When
      const result = await service.getAllSites();

      // Then
      expect(result).toEqual(mSites);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith();
    });
  });

});