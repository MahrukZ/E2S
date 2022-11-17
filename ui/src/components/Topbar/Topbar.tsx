import { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import SiteDropdown from "./SiteDropdown";
import { SitesService } from "../../services/topbar/sites";
import "./Topbar.css";


function Topbar() {

  const [siteList, setSiteList] = useState<String[]>([])

  const sitesService = new SitesService();

  let sitesList2: String[] = [];

  useEffect(() => {
    const getAllSites =async () => {
      const sites = await sitesService.getSites();
      const site1: String = String(sites["data"][0]["name"]);
      const site2: String = String(sites["data"][1]["name"]);
      const site3: String = String(sites["data"][2]["name"]);
      sitesList2.push(site1);
      sitesList2.push(site2);
      sitesList2.push(site3);
      setSiteList(sitesList2)
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