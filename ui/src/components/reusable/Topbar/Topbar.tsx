import React, { useState } from 'react'
import { FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Container, Nav, Navbar, Dropdown, DropdownButton, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"


function Topbar() {

  // Reference - Set dropdown to appear on hover
  // Taken from https://stackoverflow.com/a/63371122
  const [show, setShow] = useState(false);

  const showDropdown = (_e: any)=>{
    setShow(!show);
  }
  const hideDropdown = (_e: any) => {
    setShow(false);
  }
  // End of reference
  return (
    <Navbar className='py-0' id='colour-nav'>
      <Container className="justify-content-end">
        <Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Container id="hoverContainer" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
              <DropdownButton 
                id="dropdown-basic-button" 
                title={<span><FaUserAlt /> Rhys Jones </span>}
                show={show}
                size="sm">
                <Dropdown.Item id='settingsDropdown' href="#"><FaCog />   SETTINGS</Dropdown.Item>
                <Dropdown.Item id='signOutDropdown' href="#"><FaSignOutAlt />  SIGN OUT</Dropdown.Item>
              </DropdownButton>
            </Container>
          </Nav>
        </Navbar.Collapse>
        </Row>

      </Container>
    </Navbar>
  )
}

export default Topbar