import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import AccountDropdown from './AccountDropdown';
import { UserManagementService } from "../../../services/dashboard/topbar/user_management";
import "./Topbar.css";


function Topbar() {
  const [user, setUser] = useState<{userId: number; name: string}>({
    userId: 0,
    name: ""
  });

  const userManagementService = new UserManagementService();

  useEffect(() => {
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
            <AccountDropdown name={user.name} />
          </Nav>
        </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Topbar