import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
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
        if (password !== tempPassword) {
            setError("Passwords do not match!");
            valid = false;
        }
        if (valid) {
            setError("");
            try {
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
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="e.g. john_doe@example.com"
                                defaultValue={user.email}
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
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. John"
                                        defaultValue={user.firstName}
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
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Doe"
                                        defaultValue={user.lastName}
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
                                    <Form.Label>Organisation</Form.Label>
                                    {user.orgId! !== 0 && (
                                        <Form.Select
                                            className="mb-3"
                                            defaultValue={user.orgId}
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
                                    )}
                                    <Form.Text>
                                        Cannot find your Organisation?
                                        <a href="/admin/upload">
                                            Create an Organisation
                                        </a>
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Label>Role</Form.Label>
                                {user.role!.length > 0 && (
                                    <Form.Select
                                        className="mb-3"
                                        defaultValue={user.role}
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
                                )}
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
                                            Confirm Password
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
                    <Button variant="primary" onClick={handleEditUser}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUser;
