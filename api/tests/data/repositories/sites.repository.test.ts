import { SiteRepository } from "../../../data/repositories/sites.repository";
import { Sites, ISite } from "../../../data/models/sites.model";

describe('SiteRepository', () => {
    const siteRepository = new SiteRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SiteRepository.findSiteById', () => {
        it('should find sites and users when Id is provided', async () => {
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
});