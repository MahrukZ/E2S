import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import AddSite from "./AddSite";
import DeleteSite from "./DeleteSite";
import EditSite from "./EditSite";

export interface ISite {
    siteId?: number;
    name?: string;
    location?: string;
    orgId?: number;
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
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [sitesList, setSitesList] = useState<ISiteManagement[]>([]);
    const siteManagementService = new SiteManagementService();

    useEffect(() => {
        setLoading(true);
        const getAllSites = async () => {
            const sites = await siteManagementService.getAllSiteManagements();
            setSitesList(sites.data);
            setLoading(false);
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
                <td>
                    <EditSite
                        siteId={data.siteId}
                        setSitesList={setSitesList}
                    />
                </td>
                <td>
                    <DeleteSite id={data.siteId} setSitesList={setSitesList} />
                </td>
            </tr>
        );
    });

    return (
        <>
            <Container
                id="siteTable"
                className="d-flex align-items-end flex-column"
            >
                <AddSite setSitesList={setSitesList} />
                {isLoading ? (
                    <ReactLoading
                        className="loaderAlignment"
                        type="bars"
                        color="#203841"
                        height={"40%"}
                        width={"40%"}
                    />
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Organisation</th>
                                <th>Number Of Users</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>{siteData}</tbody>
                    </Table>
                )}
                <AddSite setSitesList={setSitesList} />
            </Container>
        </>
    );
}

export default SiteTable;
