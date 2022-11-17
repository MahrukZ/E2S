import { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import SiteDropdown from "./SiteDropdown";
import { SitesAndUsersService } from "../../services/topbar/sites_and_users";
import "./Topbar.css";
import SiteAndUser from "../../data/SiteAndUser";

function Topbar() {

  const [siteList, setSiteList] = useState<SiteAndUser[]>([])

  const sitesAndUsersService = new SitesAndUsersService();

  useEffect(() => {
    const getAllSites =async () => {
      let sitesList: SiteAndUser[] = [];

      const sites = await sitesAndUsersService.findSitesAndUsersByUserId(3);

      console.log(sites["data"].length);

      for (let i = 0; i < sites["data"].length; i++ ) {
        const currentSite: string = String(sites["data"][i]["name"]);
        const currentSiteId: number = (sites["data"][i]["site_id"]);

        const siteToAdd: SiteAndUser = new SiteAndUser(currentSiteId, currentSite);

        sitesList.push(siteToAdd);
      }

      setSiteList(sitesList)
    }
    getAllSites();
  }, []);

  return (
    <Navbar data-testid="topbar" className='py-0' id='topbar'>
      <Container className="justify-content-end">
        <Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <SiteDropdown sites = {siteList} />
            <AccountDropdown name="Rhys Jones" />
          </Nav>
        </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Topbar