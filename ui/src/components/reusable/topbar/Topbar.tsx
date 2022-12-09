import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
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

interface TopbarProps {
    setCurrentSite: any;
    currentSite: any;
    topbarTitle: any;
}

function Topbar({ setCurrentSite, currentSite, topbarTitle }: TopbarProps) {
    const [siteList, setSiteList] = useState<ISiteAndUser[]>([]);
    const [user, setUser] = useState<IUser>({
        userId: 0,
        name: "",
    });

    const location = useLocation();

    const usersService = new UsersService();
    const sitesAndUsersService = new SitesAndUsersService();
    const userManagementService = new UserManagementService();

    const getCurrentUserId = async (): Promise<number> => {
        const checkSignIn = await usersService.checkSignIn();
        if (checkSignIn["loggedIn"] === true) {
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
                const sites =
                    await sitesAndUsersService.findSitesAndUsersByUserId(
                        userId
                    );

                for (let i = 0; i < sites["data"].length; i++) {
                    const currentSite: string = String(
                        sites["data"][i]["name"]
                    );
                    const currentSiteId: number = sites["data"][i]["siteId"];
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
                const userJSON =
                    await userManagementService.findUserManagementByUserId(
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

    console.log("location: ", location.pathname);

    if (["/sign-in"].includes(location.pathname)) {
        return <></>;
    }
    return (
        <>
            <Navbar data-testid="topbar" className="py-0" id="topbar">
                <Container>
                    <Nav id="titleNav">
                        <h2 className="me-5" id="pageTitle">
                            {topbarTitle}
                        </h2>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav id="siteDropdownNav">
                            <SiteDropdown
                                sites={siteList}
                                currentSite={currentSite}
                                setCurrentSite={setCurrentSite}
                            />
                        </Nav>
                        <Nav id="accountDropdownNav">
                            <AccountDropdown user={user} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Topbar;
