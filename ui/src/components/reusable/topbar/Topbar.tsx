import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { SitesAndUsersService } from "../../../services/sitesAndUsers.service";
import { UserManagementService } from "../../../services/userManagement.service";
import AccountDropdown from './AccountDropdown';
import SiteDropdown from "./SiteDropdown";
import "./Topbar.css";

export interface IUser {
  userId: number,
  name: string
}

export interface ISiteAndUser {
  siteId: number,
  siteName: string
}

function Topbar() {
  
  const [siteList, setSiteList] = useState<ISiteAndUser[]>([]);
  const [user, setUser] = useState<IUser>({
    userId: 0,
    name: ""
  });

  const sitesAndUsersService = new SitesAndUsersService();
  const userManagementService = new UserManagementService();

  useEffect(() => {

    const getAllSites =async () => {
      let sitesList: ISiteAndUser[] = [];

      const sites = await sitesAndUsersService.findSitesAndUsersByUserId(3);

      for (let i = 0; i < sites["data"].length; i++ ) {
        const currentSite: string = String(sites["data"][i]["name"]);
        const currentSiteId: number = (sites["data"][i]["site_id"]);
        const siteToAdd: ISiteAndUser = {
          siteId: currentSiteId,
          siteName: currentSite
        };
        sitesList.push(siteToAdd);
      }
      setSiteList(sitesList);
    }
    getAllSites();

    const getUser =async () => {
      const userJSON = await userManagementService.findUserManagementByUserId(3); // User ID of 3 until login system is implemented
      setUser({userId:userJSON["data"][0]["userId"], name: String(userJSON["data"][0]["firstName"]) + " " + String(userJSON["data"][0]["lastName"])});
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