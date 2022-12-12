import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import { SitesService } from "../../../../services/sites.service";
import Message from "../../../reusable/alerts/Message";
import { IOrganisation } from "./OrganisationPage";
import { ISite } from "./SiteTable";

interface IAddSiteProp {
    setSitesList: any;
}

function AddSite({ setSitesList }: IAddSiteProp) {
    const [site, setSite] = useState<ISite>({
        siteId: 0,
        name: "",
        location: "",
        orgId: 0,
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [orgsList, setOrgsList] = useState<IOrganisation[]>([]);

    const sitesService = new SitesService();
    const organisationsService = new OrganisationsService();
    const siteManagementService = new SiteManagementService();

    const getAllOrganisations = async () => {
        try {
            const orgs = await organisationsService.getAllOrganisations();
            setOrgsList(orgs.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => {
        setShow(true);
        getAllOrganisations();
    };
    const handleClose = () => setShow(false);

    const handleCreateSite = async () => {
        let valid: boolean = true;
        if (site.name!.length <= 0 || site.location!.length <= 0) {
            setError("Fill in all required fields!");
            valid = false;
        }
        if (site.orgId === 0) {
            setError("Select an organisation for this site!");
        }
        if (valid) {
            setError("");
            try {
                await sitesService.createSite(site);
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
                id="addSiteBtn"
                className="mt-4 mb-4"
                variant="outline-success"
                onClick={handleShow}
            >
                Add Site <FaPlus />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Abacws"
                                autoFocus
                                onChange={(e: any) => {
                                    setSite({ ...site, name: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="location"
                                >
                                    <Form.Label>Location*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Cardiff"
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
                                    <Form.Label>Organisation*</Form.Label>
                                    <Form.Select
                                        className="mb-3"
                                        onChange={(e: any) => {
                                            setSite({
                                                ...site,
                                                orgId: parseInt(e.target.value),
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
                                    <Form.Text>
                                        Cannot find your Organisation?&nbsp;
                                        <a href="/admin/organisation-management">
                                            Create an Organisation
                                        </a>
                                    </Form.Text>
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
                    <Button variant="success" onClick={handleCreateSite}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSite;
