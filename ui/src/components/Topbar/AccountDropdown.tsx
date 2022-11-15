import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import "./Topbar.css";

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
    <Container data-testid="dropdownButton" id="hoverContainer" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
    <DropdownButton 
      data-testid="dropdownMenu"
      id="dropdown-basic-button" 
      title={<span><span id="userIcon"><FaUserAlt /></span> {name} </span>}
      show={show}
      size="sm">
      <Dropdown.Item data-testid="settingsDropdown" id="settingsDropdown" href="#"><span id="settingsIcon"><FaCog /></span>  SETTINGS</Dropdown.Item>
      <Dropdown.Item data-testid="signOutDropdown" id="signOutDropdown" href="#"><span id="signOutIcon"><FaSignOutAlt /></span>  SIGN OUT</Dropdown.Item>
    </DropdownButton>
  </Container>
  )
}

export default AccountDropdown