import { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import SiteDropdown from "./SiteDropdown";
import { SitesAndUsersService } from "../../../services/sitesAndUsers";
import "./Topbar.css";
import SiteAndUser from "../../../data/SiteAndUser";
import { UserManagementService } from "../../../services/userManagement";


function Topbar() {
  
  const [siteList, setSiteList] = useState<SiteAndUser[]>([])

  const sitesAndUsersService = new SitesAndUsersService();

  const [user, setUser] = useState<{userId: number; name: string}>({
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
          <AccountDropdown name={user.name} />
          </Nav>
        </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Topbar