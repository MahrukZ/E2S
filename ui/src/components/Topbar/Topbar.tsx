import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import { UserManagementService } from "../../services/dashboard/topbar/user_management";
import "./Topbar.css";


function Topbar() {

  const [userName, setUserName] = useState<String>();

  const userManagementService = new UserManagementService();

  useEffect(() => {
    const getUser =async () => {
      const user = await userManagementService.findUserManagementByUserId(3);
      const firstName: String = String(user["data"][0]["first_name"]);
      console.log(firstName);
      setUserName(firstName)
    }
    getUser();
  }, []);


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