import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { SitesService } from "../../../../services/sites.service";
import { UserManagementService } from "../../../../services/userManagement.service";
import { UsersService } from "../../../../services/users.service";
import Message from "../../../reusable/alerts/Message";
import { IOrganisation } from "../siteManagement/OrganisationPage";
import { ISite } from "../siteManagement/SiteTable";
import { IUser } from "./UserTable";
import "./UserManagement.css";
import { SitesHasUsersService } from "../../../../services/sitesHasUsers.service";

interface IAddUserProp {
    setUsersList: any;
}

function AddUser({ setUsersList }: IAddUserProp) {
    const [tempPassword, setTempPassword] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<IUser>({
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        orgId: 0,
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [orgsList, setOrgsList] = useState<IOrganisation[]>([]);
    const [sitesList, setSitesList] = useState<ISite[]>([]);
    const [sitesHasUsersList, setSitesHasUsersList] = useState<[]>([]);

    const usersService = new UsersService();
    const userManagementService = new UserManagementService();
    const organisationsService = new OrganisationsService();
    const siteService = new SitesService();
    const sitesHasUsersService = new SitesHasUsersService();

    const getAllOrganisations = async () => {
        try {
            const orgs = await organisationsService.getAllOrganisations();
            const sites = await siteService.getSites();
            setOrgsList(orgs.data);
            setSitesList(sites.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => {
        setShow(true);
        getAllOrganisations();
    };
    const handleClose = () => setShow(false);

    const handleChecked = (e: any) => {
        let tempSitesHasUsersList: any = sitesHasUsersList;
        let isChecked = e.target.checked;

        if (isChecked === true) {
            tempSitesHasUsersList.push(e.target.id);
        } else if (isChecked === false) {
            const index = tempSitesHasUsersList.indexOf(e.target.id);
            tempSitesHasUsersList.splice(index, 1);
        }
        setSitesHasUsersList(tempSitesHasUsersList);
    };

    const handleCreateUser = async () => {
        let valid: boolean = true;
        if (
            user.email!.length <= 0 ||
            user.firstName!.length <= 0 ||
            user.lastName!.length <= 0 ||
            user.password!.length <= 0 ||
            user.role!.length <= 0
        ) {
            setError("Fill in all required fields!");
            valid = false;
        }
        if (user.orgId === 0) {
            setError("Select an organisation for this user!");
        }
        if (password !== tempPassword) {
            setError("Passwords do not match!");
            valid = false;
        }
        if (valid) {
            setError("");
            try {
                await usersService.createUser(user);

                const u = await usersService.findUserByEmail(user.email!);
                for (let i = 0; i < sitesHasUsersList.length; i++) {
                    await sitesHasUsersService.createSitesHasUsers({
                        siteId: parseInt(sitesHasUsersList[i]),
                        userId: u["data"][0]["userId"],
                    });
                }

                const users =
                    await userManagementService.getAllUserManagements();
                setUsersList(users.data);
                setShow(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Button
                id="addUserBtn"
                className="mt-4 mb-4"
                variant="outline-success"
                onClick={handleShow}
            >
                Add User <FaPlus />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="e.g. john_doe@example.com"
                                autoFocus
                                onChange={(e: any) => {
                                    setUser({ ...user, email: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="firstName"
                                >
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. John"
                                        autoFocus
                                        onChange={(e: any) => {
                                            setUser({
                                                ...user,
                                                firstName: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="lastName"
                                >
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Doe"
                                        autoFocus
                                        onChange={(e: any) => {
                                            setUser({
                                                ...user,
                                                lastName: e.target.value,
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
                                            setUser({
                                                ...user,
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
                                        Cannot find your Organisation?
                                        <a href="/admin/organisation-management">
                                            Create an Organisation
                                        </a>
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Label>Role*</Form.Label>
                                <Form.Select
                                    className="mb-3"
                                    onChange={(e: any) => {
                                        setUser({
                                            ...user,
                                            role: e.target.value,
                                        });
                                    }}
                                >
                                    <option>Select a Role</option>
                                    <option value="director of estates">
                                        Director of Estates
                                    </option>
                                    <option value="facility energy manager">
                                        Facility Energy Manager
                                    </option>
                                    <option value="administrator">
                                        Administrator
                                    </option>
                                </Form.Select>
                            </Col>

                            <Row>
                                <Form.Label>List of Sites Managed</Form.Label>
                                <div className="sitesListRow">
                                    <Form.Group className="mb-3">
                                        {sitesList.map((site, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                id={String(site.siteId)}
                                                label={site.name}
                                                onChange={(e) =>
                                                    handleChecked(e)
                                                }
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                            </Row>

                            <Row className="mt-3 mb-3">
                                <Col>
                                    <Form.Group controlId="password">
                                        <Form.Label>
                                            Temporary Password*
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            autoFocus
                                            onChange={(e: any) => {
                                                setTempPassword(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>
                                            Confirm Password*
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            autoFocus
                                            onChange={(e: any) => {
                                                setUser({
                                                    ...user,
                                                    password: e.target.value,
                                                });
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
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
                    <Button variant="success" onClick={handleCreateUser}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUser;
