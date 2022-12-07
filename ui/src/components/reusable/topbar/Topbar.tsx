import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { SitesAndUsersService } from "../../../services/sitesAndUsers.service";
import { UserManagementService } from "../../../services/userManagement.service";
import { UsersService } from "../../../services/users.service";
import AccountDropdown from "./AccountDropdown";
import SiteDropdown from "./SiteDropdown";
import "./Topbar.css";

export interface IUser {
  userId: number;
  name: string;
}

export interface ISiteAndUser {
  siteId: number;
  siteName: string;
}

function Topbar() {
  const [siteList, setSiteList] = useState<ISiteAndUser[]>([]);
  const [user, setUser] = useState<IUser>({
    userId: 0,
    name: "",
  });

  const usersService = new UsersService();
  const sitesAndUsersService = new SitesAndUsersService();
  const userManagementService = new UserManagementService();

  const getCurrentUserId = async (): Promise<number> => {
    const checkSignIn = await usersService.checkSignIn();
    if (checkSignIn["loggedIn"] == true) {
      return checkSignIn.user.userId;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const getAllSites = async () => {
      const userId: any = await getCurrentUserId();
      if (userId) {
        let sitesList: ISiteAndUser[] = [];
        const sites = await sitesAndUsersService.findSitesAndUsersByUserId(
          userId
        );

        for (let i = 0; i < sites["data"].length; i++) {
          const currentSite: string = String(sites["data"][i]["name"]);
          const currentSiteId: number = sites["data"][i]["site_id"];
          const siteToAdd: ISiteAndUser = {
            siteId: currentSiteId,
            siteName: currentSite,
          };
          sitesList.push(siteToAdd);
        }
        setSiteList(sitesList);
      }
    };
    getAllSites();

    const getUser = async () => {
      const userId: any = await getCurrentUserId();
      if (userId) {
        const userJSON = await userManagementService.findUserManagementByUserId(
          userId
        );
        setUser({
          userId: userJSON["data"][0]["user_id"],
          name:
            String(userJSON["data"][0]["firstName"]) +
            " " +
            String(userJSON["data"][0]["lastName"]),
        });
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();

  if (["/sign-in"].includes(location.pathname)) {
    return <></>;
  }
  return (
    <Navbar data-testid="topbar" className="py-0" id="topbar">
      <Container className="justify-content-end">
        <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <SiteDropdown sites={siteList} />
              <AccountDropdown user={user} />
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Topbar;
