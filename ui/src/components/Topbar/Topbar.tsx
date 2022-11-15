import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import "./Topbar.css";


function Topbar() {
  return (
    <Navbar data-testid="topbar" className='py-0' id='topbar'>
      <Container className="justify-content-end">
        <Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <AccountDropdown name="Rhys Jones" />
          </Nav>
        </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Topbar