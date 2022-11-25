import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import SiteAndUser from "../../../dtos/SiteAndUser";
import { SitesAndUsersService } from "../../../services/sitesAndUsers.service";
import { UserManagementService } from "../../../services/userManagement.service";
import AccountDropdown from './AccountDropdown';
import SiteDropdown from "./SiteDropdown";
import "./Topbar.css";

export interface IUser {
  userId: number,
  name: string
}

function Topbar() {
  
  const [siteList, setSiteList] = useState<SiteAndUser[]>([])

  const sitesAndUsersService = new SitesAndUsersService();

  const [user, setUser] = useState<IUser>({
    userId: 0,
    name: ""
  });

  const userManagementService = new UserManagementService();

  useEffect(() => {

    const getAllSites =async () => {
      let sitesList: SiteAndUser[] = [];

      const sites = await sitesAndUsersService.findSitesAndUsersByUserId(3);

      for (let i = 0; i < sites["data"].length; i++ ) {
        const currentSite: string = String(sites["data"][i]["name"]);
        const currentSiteId: number = (sites["data"][i]["site_id"]);
        const siteToAdd: SiteAndUser = new SiteAndUser(currentSiteId, currentSite);
        sitesList.push(siteToAdd);
      }
      setSiteList(sitesList)
    }
    getAllSites();

    const getUser =async () => {
      const userJSON = await userManagementService.findUserManagementByUserId(3); // User ID of 3 until login system is implemented
      setUser({userId:userJSON["data"][0]["user_id"], name: String(userJSON["data"][0]["first_name"]) + " " + String(userJSON["data"][0]["last_name"])});
    }
    getUser();
  }, []);

  return (
    <Navbar data-testid="topbar" className="py-0" id="topbar">
      <Container className="justify-content-end">
        <Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <SiteDropdown sites = {siteList} />
          <AccountDropdown user={user} />
          </Nav>
        </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Topbar