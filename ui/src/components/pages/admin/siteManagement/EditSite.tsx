import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import { SitesService } from "../../../../services/sites.service";
import Message from "../../../reusable/alerts/Message";
import { IOrganisation } from "./OrganisationPage";
import Upload from "./upload/Upload";
import { ISite } from "./SiteTable";

interface IEditSiteProp {
    siteId: any;
    setSitesList: any;
}

function EditSite({ siteId, setSitesList }: IEditSiteProp) {
    const [site, setSite] = useState<ISite>({
        siteId: 0,
        name: "",
        location: "",
        orgId: 0,
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [orgsList, setOrgsList] = useState<IOrganisation[]>([]);

    const organisationsService = new OrganisationsService();
    const sitesService = new SitesService();
    const siteManagementService = new SiteManagementService();

    const findSiteAndGetAllOrganisations = async () => {
        try {
            const siteData = await sitesService.findSiteById(siteId);
            const orgs = await organisationsService.getAllOrganisations();
            console.log(siteData);
            setSite(siteData.data[0]);
            setOrgsList(orgs.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => {
        setShow(true);
        findSiteAndGetAllOrganisations();
    };
    const handleClose = () => setShow(false);

    const handleEditSite = async () => {
        let valid: boolean = true;
        if (valid) {
            setError("");
            try {
                await sitesService.updateSite(site);
                const sites =
                    await siteManagementService.getAllSiteManagements();
                setSitesList(sites.data);
                setShow(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Button
                id="editUserBtn"
                variant="outline-primary"
                onClick={handleShow}
            >
                <FaEdit />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Abacws"
                                        defaultValue={site.name}
                                        autoFocus
                                        onChange={(e: any) => {
                                            setSite({
                                                ...site,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="location"
                                >
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Cardiff"
                                        defaultValue={site.location}
                                        autoFocus
                                        onChange={(e: any) => {
                                            setSite({
                                                ...site,
                                                location: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="org">
                                    <Form.Label>Organisation</Form.Label>
                                    {site.orgId! !== 0 && (
                                        <Form.Select
                                            className="mb-3"
                                            defaultValue={site.orgId}
                                            onChange={(e: any) => {
                                                setSite({
                                                    ...site,
                                                    orgId: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                            }}
                                        >
                                            <option value="0">
                                                Select an Organisation
                                            </option>
                                            {orgsList.map((org, index) => (
                                                <option
                                                    key={index}
                                                    value={org.orgId}
                                                >
                                                    {org.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                    <Form.Text>
                                        Cannot find your Organisation?&nbsp;
                                        <a href="/admin/organisation-management">
                                            Create an Organisation
                                        </a>
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Upload siteId={site.siteId!} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    {error.length > 0 && (
                        <Message message={error} type="danger" />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditSite}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditSite;
