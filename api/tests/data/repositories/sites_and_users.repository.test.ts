import { SitesAndUsersRepository } from "../../../data/repositories/sites_and_users.repository";
import { SitesAndUsers, ISitesAndUsers } from "../../../data/models/sites_and_users.model";

describe('SitesAndUsersRepository', () => {
    const sitesAndUsersRepository = new SitesAndUsersRepository();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SitesAndUsersRepository.getAllSitesAndUsers', () => {
        it('should fetch all sites and users when there is data in the database', async () => {
            // Given
            const mockResponse: ISitesAndUsers[] = [
                {
                    site_id: 1,
                    name: 'Abacws',
                    user_id: 1
                },
                {
                    site_id: 1,
                    name: 'Abacws',
                    user_id: 3
                },
                {
                    site_id: 2,
                    name: 'National Software Academy',
                    user_id: 1
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

        it('should not fetch insights when there is no data in the database', async () => {
            // Given 
            // When
            const mErrorMessage = new Error("Failed to fetch all insights.");
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
            const mockResponse = true;

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
            const mErrorMessage = new Error("Failed to delete insights.");
            sitesAndUsersRepository.findSitesAndUsersByUserId = jest.fn().mockRejectedValue(mErrorMessage);
            
            // Then
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).rejects.toMatchObject(mErrorMessage);
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).toHaveBeenCalledTimes(1);
            expect(sitesAndUsersRepository.findSitesAndUsersByUserId).toHaveBeenCalledWith();
        });
    });    
});