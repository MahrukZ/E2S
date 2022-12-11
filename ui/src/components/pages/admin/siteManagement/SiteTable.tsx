import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { SitesService } from "../../../../services/sites.service";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import DeleteSite from "./DeleteSite";
// import AddUser from "./AddUser";
// import DeleteUser from "./DeleteUser";
// import EditUser from "./EditUser";

export interface ISite {
    siteId?: number;
    name?: string;
    location?: string;
    orgId?: number;
    orgName?: string;
}

export interface ISiteManagement {
    siteId?: number;
    name?: string;
    location?: string;
    orgId?: number;
    organisation?: string;
    numberOfUsers: number;
}

export interface IUserManagement {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    organisation: string;
    noSitesManaged: number;
    role: string;
}

function SiteTable() {
    const [sitesList, setSitesList] = useState<ISiteManagement[]>([]);
    const sitesService = new SitesService();
    const siteManagementService = new SiteManagementService();

    useEffect(() => {
        const getAllSites = async () => {
            const sites = await siteManagementService.getAllSiteManagements();
            setSitesList(sites.data);
        };
        getAllSites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const siteData = sitesList.map((data, id) => {
        return (
            <tr key={id}>
                <td>{data.siteId}</td>
                <td>{data.name}</td>
                <td>{data.location}</td>
                <td>{data.organisation}</td>
                <td>{data.numberOfUsers}</td>
                {/* <td>{data.email}</td>
                <td>{data.organisation}</td>
                <td>{data.noSitesManaged}</td>
                <td>{data.role}</td> */}
                {/* <td>
                    <EditUser
                        userEmail={data.email}
                        setUsersList={setUsersList}
                    />
                </td> */}
                <td>
                    <DeleteSite id={data.siteId} setSitesList={setSitesList} />
                </td>
            </tr>
        );
    });

    return (
        <>
            <Container className="d-flex align-items-end flex-column">
                {/* <AddUser setUsersList={setUsersList} /> */}
                <Table id="userTable" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Organisation</th>
                            <th>Number Of Users</th>

                            {/* <th>Email Address</th>
                            <th>Organisation</th>
                            <th>No Of Sites Managed</th>
                            <th>Role</th> */}
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>{siteData}</tbody>
                </Table>
                {/* <AddUser setUsersList={setUsersList} /> */}
            </Container>
        </>
    );
}

export default SiteTable;
