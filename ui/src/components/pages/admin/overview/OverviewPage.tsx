import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserManagementCol from "./UserManagementCol";
import "./OverviewCols.css";

interface OverviewPageProps {
    setTopbarTitle: any;
}

function OverviewPage({ setTopbarTitle }: OverviewPageProps) {
    useEffect(() => {
        setTopbarTitle("Overview");
        document.title = "Admin - Overview";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container className="mt-5">
            <Row className="cardRow">
                <UserManagementCol />
                <Col>Site Management</Col>
            </Row>
        </Container>
    );
}

export default OverviewPage;
