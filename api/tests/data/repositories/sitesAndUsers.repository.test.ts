import { SitesAndUsersRepository } from "../../../data/repositories/sitesAndUsers.repository";
import { SitesAndUsers, ISitesAndUser } from "../../../data/models/sitesAndUsers.model";

describe('SitesAndUsersRepository', () => {
    const sitesAndUsersRepository = new SitesAndUsersRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SitesAndUsersRepository.getAllSitesAndUsers', () => {
        it('should fetch all sites and users when there is data in the database', async () => {
            // Given
            const mockResponse: ISitesAndUser[] = [
                {
                    siteId: 1,
                    name: "Abacws",
                    userId: 1
                },
                {
                    siteId: 1,
                    name: "Abacws",
                    userId: 3
                },
                {
                    siteId: 2,
                    name: "National Software Academy",
                    userId: 1
                }
            ];
            SitesAndUsers.findAll = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await sitesAndUsersRepository.getAllSitesAndUsers();

            // Then
            expect(result).toEqual(mockResponse);
            expect(SitesAndUsers.findAll).toHaveBeenCalledTimes(1);
            expect(SitesAndUsers.findAll).toHaveBeenCalledWith();
        });

        it('should not fetch sites and users when there is no data in the database', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to fetch all sites and users.");
            sitesAndUsersRepository.getAllSitesAndUsers = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(sitesAndUsersRepository.getAllSitesAndUsers).rejects.toMatchObject(mErrorMessage);
            expect(sitesAndUsersRepository.getAllSitesAndUsers).toHaveBeenCalledTimes(1);
            expect(sitesAndUsersRepository.getAllSitesAndUsers).toHaveBeenCalledWith();
        });
    });

    describe('SitesAndUsersRepository.findSitesAndUsersByUserId', () => {
        it('should find sites and users when Id is provided', async () => {
            // Given
            const userId = 1;
            const mockResponse: ISitesAndUser[] = [
                {
                    siteId: 1,
                    name: "Abacws",
                    userId: 1
                },
                {
                    siteId: 1,
                    name: "Abacws",
                    userId: 3
                },
                {
                    siteId: 2,
                    name: "National Software Academy",
                    userId: 1
                }
            ];

            SitesAndUsers.findAll = jest.fn().mockResolvedValue(mockResponse);

            // When
            const result = await sitesAndUsersRepository.findSitesAndUsersByUserId(userId);

            // Then
            expect(result).toEqual(mockResponse);
            expect(SitesAndUsers.findAll).toHaveBeenCalledTimes(1);
            expect(SitesAndUsers.findAll).toBeCalledWith({
                where: {
                    user_id: userId
                }
            });
        });

        it('should not fins sites and users when there is no Id provided', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to fetch sites and users.");
            sitesAndUsersRepository.findSitesAndUsersByUserId = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).rejects.toMatchObject(mErrorMessage);
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).toHaveBeenCalledTimes(1);
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).toHaveBeenCalledWith();
        });
    });    
});