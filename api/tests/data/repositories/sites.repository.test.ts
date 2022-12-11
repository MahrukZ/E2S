import { SiteRepository } from "../../../data/repositories/sites.repository";
import { Sites, ISite } from "../../../data/models/sites.model";

describe('SiteRepository', () => {
    const siteRepository = new SiteRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SiteRepository.findSiteById', () => {
        it('should find sites when Id is provided', async () => {
            // Given
            const siteId = 1;
            const mockResponse: ISite =
            {
                siteId: 1,
                name: "Abacws",
                location: "Cathays",
                orgId: 1
            };

            Sites.findAll = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await siteRepository.findSiteById(siteId);

            // Then
            expect(result).toEqual(mockResponse);
            expect(Sites.findAll).toHaveBeenCalledTimes(1);
            expect(Sites.findAll).toBeCalledWith({
                where: {
                    siteId: siteId
                }
            });
        });

        it('should not finds sites when there is no Id provided', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to delete insights.");
            siteRepository.findSiteById = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(siteRepository.findSiteById).rejects.toMatchObject(mErrorMessage);
            expect(siteRepository.findSiteById).toHaveBeenCalledTimes(1);
            expect(siteRepository.findSiteById).toHaveBeenCalledWith();
        });
    });  
    
    
  describe("SiteRepository.getAllSites", () => {
    it("should fetch all sites when there is data in the database", async () => {
      // Given
      const mockResponse: ISite[] = [
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
      Sites.findAll = jest.fn().mockResolvedValue(mockResponse);

      // When
      const result = await siteRepository.getAllSites();

      // Then
      expect(result).toEqual(mockResponse);
      expect(Sites.findAll).toHaveBeenCalledTimes(1);
      expect(Sites.findAll).toHaveBeenCalledWith();
    });

    it("should not fetch site data when there is no data in the database", async () => {
      // Given
      // When
      const mErrorMessage = new Error("Failed to fetch all sites.");
      siteRepository.getAllSites = jest
        .fn()
        .mockRejectedValue(mErrorMessage);

      // Then
      expect(
        siteRepository.getAllSites
      ).rejects.toMatchObject(mErrorMessage);
      expect(
        siteRepository.getAllSites
      ).toHaveBeenCalledTimes(1);
      expect(
        siteRepository.getAllSites
      ).toHaveBeenCalledWith();
    });
  });
});