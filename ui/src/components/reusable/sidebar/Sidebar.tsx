import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import * as FaIcons from "react-icons/fa";

import { useState } from "react";

import styled from "styled-components";

import logo from "./../../../assets/images/Cardiff_University_logo.png";

//css in this file due to custom headings with links

const CollapsedSideBar = styled.div`
  width: 100px;
  height: 100vh;
  background-color: #417285;
  position: fixed;
  top: 0;
`;

const MenuIconOpen = styled(Link)`
    background-color: #203841:     
    align-content: center;
    display: flex;
    justify-content: start;
    font-size: 2.5rem;
    margin-left: 1.85rem;
    margin-top: 1.25rem;
    margin-bottom: 1rem;
    color: #ffffff;

`;

const MenuIconClose = styled(Link)`
  font-size: 2.5rem;
  color: #ffffff;
  margin-left: 6.5rem;
`;

const TopSideBarClose = styled.div`
  display: flex;
  // justify-content: end;
  margin-left: 2rem;
  font-size: 2.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const SidebarMenu = styled.div<{ close: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: #417285;
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? "0" : "-100%")};
  transition: 0.3s;
`;

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 90px;
  padding: 1rem 0 1.25rem;
`;

const MenuItemLinks = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 11px;
  text-decoration: none;
  color: #ffffff;
  margin: 0 1rem;

  &:hover {
    background-color: #ffffff;
    color: #0f242c;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 0 1rem;
  }
`;

const CollapsedMenuItemLinks = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 11px;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    background-color: #ffffff;
    color: #0f242c;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
`;

const ImageLink = styled(Link)``;

const Sidebar: React.FunctionComponent = () => {
  const [close, setClose] = useState(false);
  const showSidebar = () => setClose(!close);
  return (
    <>
      {/*The collapsed sidebar which only shows the icons*/}
      <CollapsedSideBar data-testid="collapsedSideBar">
        <MenuIconOpen data-testid="menuIconOpen" to="#" onClick={showSidebar}>
          <FaIcons.FaBars />
        </MenuIconOpen>

        {SidebarData.map((item, index) => {
          return (
            <MenuItems key={index}>
              <CollapsedMenuItemLinks to={item.path}>
                {item.icon}
              </CollapsedMenuItemLinks>
            </MenuItems>
          );
        })}
      </CollapsedSideBar>

      {/*The expanded sidebar which shows the icons, text and picture*/}
      <SidebarMenu data-testid="sidebarMenu" close={close}>
        <TopSideBarClose>
          {/* Image placed inside ui/src so that it is accessible */}
          <ImageLink to={"/"}>
            <img width={50} height={50} src={logo} alt="logo" />
          </ImageLink>

          <MenuIconClose
            data-testid="menuIconClose"
            to="#"
            onClick={showSidebar}
          >
            <FaIcons.FaTimes />
          </MenuIconClose>
        </TopSideBarClose>

        {SidebarData.map((item, index) => {
          return (
            <MenuItems key={index}>
              <MenuItemLinks to={item.path}>
                {item.icon}
                <h1 id="sidebarHeadings">{item.title}</h1>
              </MenuItemLinks>
            </MenuItems>
          );
        })}
      </SidebarMenu>
    </>
  );
};

export default Sidebar;
