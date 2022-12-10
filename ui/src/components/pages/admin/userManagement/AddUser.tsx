import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { UserManagementService } from "../../../../services/userManagement.service";
import { UsersService } from "../../../../services/users.service";
import { IOrganisation } from "../siteManagement/Organisations";
import { IUser } from "./UserTable";

interface IAddUserProp {
    setUsersList: any;
}

function AddUser({ setUsersList }: IAddUserProp) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [orgId, setOrgId] = useState(0);
    const [role, setRole] = useState("");
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
    const [orgsList, setOrgsList] = useState<IOrganisation[]>([]);

    const usersService = new UsersService();
    const userManagementService = new UserManagementService();
    const organisationsService = new OrganisationsService();

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

    const handleCreateUser = async () => {
        try {
            setUser({
                email,
                firstName,
                lastName,
                role,
                password,
                orgId,
            });
            await usersService.createUser(user);
            const users = await userManagementService.getAllUserManagements();
            setUsersList(users.data);
            setShow(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button
                className="mb-4"
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="e.g. john_doe@example.com"
                                autoFocus
                                onChange={(e: any) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="firstName"
                                >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. John"
                                        autoFocus
                                        onChange={(e: any) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="lastName"
                                >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Doe"
                                        autoFocus
                                        onChange={(e: any) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="org">
                                    <Form.Label>Organisation</Form.Label>
                                    <Form.Select
                                        className="mb-3"
                                        onChange={(e: any) => {
                                            setOrgId(e.target.value);
                                        }}
                                    >
                                        {orgsList.map((org, index) => (
                                            <option
                                                key={index}
                                                value={org.orgId}
                                            >
                                                {org.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    className="mb-3"
                                    onChange={(e: any) => {
                                        setRole(e.target.value);
                                    }}
                                >
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
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="password"
                                    >
                                        <Form.Label>
                                            Temporary Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="confirmPassword"
                                    >
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            autoFocus
                                            onChange={(e: any) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
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
