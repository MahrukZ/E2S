import axios from 'axios';
import '@testing-library/jest-dom'
import { SitesAndUsersService } from '../../src/services/sitesAndUsers.service'

jest.mock('axios');

it('Returns correct name of site', async () => {

    const mockService = new SitesAndUsersService;

    (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        site_id: 1,
        name: "Abacws",
        user_id: 1
      },
      {
        site_id: 2,
        name: "National Software Academy",
        user_id: 1
      },
      {
        site_id: 3,
        name: "Queens Building",
        user_id: 1
      }
    ]
    });

    const title = await mockService.findSitesAndUsersByUserId(1);
    const siteOneName = title[0]["name"];
    expect(siteOneName).toEqual("Abacws");
});

