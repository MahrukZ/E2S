import '@testing-library/jest-dom'
import { SitesAndUsersService } from '../../src/services/sitesAndUsers.service'

const sitesAndUsersService = new SitesAndUsersService;

it('Returns correct sites from api', async () => {

    const sites = await sitesAndUsersService.findSitesAndUsersByUserId(1);
    console.log(sites);
    const currentSite: string = String(sites["data"][1]["name"]);
    expect(currentSite).toEqual("National Software Academy");
  });
  
// Commented out for now as both tests cannot run in same file
// jest.mock('axios');

// it('Returns correct name of site', async () => {

//     (axios.get as jest.Mock).mockResolvedValue({
//     data: [
//       {
//         site_id: 1,
//         name: "Abacws",
//         user_id: 1
//       },
//       {
//         site_id: 2,
//         name: "National Software Academy",
//         user_id: 1
//       },
//       {
//         site_id: 3,
//         name: "Queens Building",
//         user_id: 1
//       }
//     ]
//   });

//   const title = await sitesAndUsersService.findSitesAndUsersByUserId(1);
//   const siteOneName = title[0]["name"];
//   expect(siteOneName).toEqual("Abacws");
// });

