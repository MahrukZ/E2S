import React, { useState } from 'react'
import { FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Container, Nav, Navbar, Dropdown, DropdownButton, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./Topbar.css"

interface AccountDropdownProps {
    name: String;
  }

function AccountDropdown({ name }: AccountDropdownProps) {

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
    <Container data-testid="dropdownButton-1" id="hoverContainer" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
    <DropdownButton 
      data-testid="dropdownMenu-1"
      id="dropdown-basic-button" 
      title={<span><FaUserAlt /> {name} </span>}
      show={show}
      size="sm">
      <Dropdown.Item data-testid="settingsDropdown-1" id="settingsDropdown" href="#"><FaCog />  SETTINGS</Dropdown.Item>
      <Dropdown.Item data-testid="signOutDropdown-1" id="signOutDropdown" href="#"><FaSignOutAlt />  SIGN OUT</Dropdown.Item>
    </DropdownButton>
  </Container>
  )
}

export default AccountDropdown