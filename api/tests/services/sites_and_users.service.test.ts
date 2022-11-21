import { ISitesAndUsers } from "../../data/models/sites_and_users.model";
import { SitesAndUsersRepository } from "../../data/repositories/sites_and_users.repository";
import { SitesAndUsersService } from "../../services/sites_and_users.service";

jest.mock('../../data/repositories/sites_and_users.repository', () => {
    const mSitesAndUsersRepo = { 
        getAllSitesAndUsers: jest.fn(),
        findSitesAndUsersByUserId: jest.fn()
    };
    return {
        SitesAndUsersRepository: jest.fn(() => mSitesAndUsersRepo)
    };
});


describe('SitesAndUsersService', () => {
    const repository = new SitesAndUsersRepository();
    const service = new SitesAndUsersService();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('SitesAndUsersService.getAllSitesAndUsers', () => {
        it('should return all sites and users', async () => {
            // Given
            const mSitesAndUsers: ISitesAndUsers[] = [
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
            const getSpy = jest
                .spyOn(repository, 'getAllSitesAndUsers')
                .mockResolvedValue(mSitesAndUsers);

            // When
            const result = await service.getAllSitesAndUsers();

            // Then
            expect(result).toEqual(mSitesAndUsers);
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith();
        });
    });

    describe('SitesAndUsersService.findSitesAndUsersByUserId', () => {
        it('should find sites and users by user id', async () => {
            // Given
            const mSitesAndUsers: ISitesAndUsers[] = [
                {
                    site_id: 1,
                    name: 'Abacws',
                    user_id: 1
                },
                {
                    site_id: 2,
                    name: 'National Software Academy',
                    user_id: 1
                }
            ];
            const userId = 1;
            const fetchSpy = jest
                .spyOn(repository, 'findSitesAndUsersByUserId')
                .mockResolvedValue(mSitesAndUsers);

            // When
            const result = await service.findSitesAndUsersByUserId(userId);

            // Then
            expect(result).toEqual(mSitesAndUsers);
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(fetchSpy).toHaveBeenCalledWith(userId);
        });
    });


});