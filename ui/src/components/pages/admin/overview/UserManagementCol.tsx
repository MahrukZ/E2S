import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { OrganisationsService } from "../../../../services/organisations.service";
import { UserManagementService } from "../../../../services/userManagement.service";
import "./OverviewCols.css";

function UserManagementCol() {
    const [numOfOrgs, setNumOfOrgs] = useState(0);
    const [numOfUsers, setNumOfUsers] = useState(0);

    const userManagementService = new UserManagementService();
    const organisationsService = new OrganisationsService();

    const getTotalNumOfUsers = async () => {
        try {
            const users = await userManagementService.getAllUserManagements();
            setNumOfUsers(users.data.length);
        } catch (err) {
            console.log(err);
        }
    };
    getTotalNumOfUsers();

    const getTotalNumOfOrganisations = async () => {
        try {
            const orgs = await organisationsService.getAllOrganisations();
            setNumOfOrgs(orgs.data.length);
        } catch (err) {
            console.log(err);
        }
    };
    getTotalNumOfOrganisations();

    return (
        <Col>
            <Card className="flex-fill card-col">
                <Card.Title>
                    <h1>
                        <FaUsers /> User Management
                    </h1>
                </Card.Title>
                <Card.Text>
                    <h6>View and Edit Users</h6>
                </Card.Text>
                <Card.Body>
                    <Row>
                        <Col>
                            <h3>Users</h3>
                            <h4>{numOfUsers}</h4>
                        </Col>
                        <div className="vr" />
                        <Col className="data">
                            <h3>Organisations</h3>
                            <h4>{numOfOrgs}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default UserManagementCol;
