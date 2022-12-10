import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { UserManagementService } from "../../../../services/userManagement.service";
import { UsersService } from "../../../../services/users.service";
import Message from "../../../reusable/alerts/Message";
import { IOrganisation } from "../siteManagement/Organisations";
import { IUser } from "./UserTable";

interface IEditUserProp {
    userEmail: string;
    setUsersList: any;
}

function EditUser({ userEmail, setUsersList }: IEditUserProp) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [orgId, setOrgId] = useState(0);
    const [role, setRole] = useState("");
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

    const usersService = new UsersService();
    const userManagementService = new UserManagementService();
    const organisationsService = new OrganisationsService();

    const findUserAndGetAllOrganisations = async () => {
        try {
            const userData = await usersService.findUserByEmail(userEmail);
            const orgs = await organisationsService.getAllOrganisations();
            console.log(userData.data[0])
            setUser(userData.data[0]);
            setOrgsList(orgs.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => {
        setShow(true);
        findUserAndGetAllOrganisations();
    };
    const handleClose = () => setShow(false);

    const handleEditUser = async () => {
        let valid: boolean = true;
        if (
            email.length <= 0 ||
            firstName.length <= 0 ||
            lastName.length <= 0 ||
            password.length <= 0 ||
            role.length <= 0
        ) {
            setError("Fill in all required fields!");
            valid = false;
        }
        if (orgId == 0) {
            setError("Select an organisation for this user!");
        }
        if (password !== tempPassword) {
            setError("Passwords do not match!");
            valid = false;
        }
        if (valid) {
            setError("");
            try {
                setUser({
                    email,
                    firstName,
                    lastName,
                    role,
                    password,
                    orgId,
                });
                await usersService.updateUser(user);
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
            <Button variant="outline-primary" onClick={handleShow}>
                <FaEdit />
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
                                value={user.email}
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
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. John"
                                        value={user.firstName}
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
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Doe"
                                        value={user.lastName}
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
                                    <Form.Label>Organisation*</Form.Label>
                                    <Form.Select
                                        className="mb-3"
                                        value={user.orgId}
                                        onChange={(e: any) => {
                                            setOrgId(e.target.value);
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
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Label>Role*</Form.Label>
                                <Form.Select
                                    className="mb-3"
                                    value={user.role}
                                    onChange={(e: any) => {
                                        setRole(e.target.value);
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
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="password"
                                    >
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
                                    <Form.Group
                                        className="mb-3"
                                        controlId="confirmPassword"
                                    >
                                        <Form.Label>
                                            Confirm Password*
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
                    {error.length > 0 && (
                        <Message message={error} type="danger" />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleEditUser}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUser;
