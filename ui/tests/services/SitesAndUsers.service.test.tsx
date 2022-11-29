import axios from 'axios';
import '@testing-library/jest-dom'
import { SitesAndUsersService } from '../../src/services/sitesAndUsers.service'

jest.mock('axios');

it('Returns correct name of site', async () => {

    const mockService = new SitesAndUsersService;

    (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        siteId: 1,
        name: "Abacws",
        userId: 1
      },
      {
        siteId: 2,
        name: "National Software Academy",
        userId: 1
      },
      {
        siteId: 3,
        name: "Queens Building",
        userId: 1
      }
    ]
    });

    const title = await mockService.findSitesAndUsersByUserId(1);
    const siteOneName = title[0]["name"];
    expect(siteOneName).toEqual("Abacws");
});

