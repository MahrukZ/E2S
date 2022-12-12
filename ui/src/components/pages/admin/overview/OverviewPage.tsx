import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserManagementCol from "./UserManagementCol";

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
        <Container className="mt-4">
            <Row>
                <UserManagementCol />
                <Col>Site Management</Col>
            </Row>
        </Container>
    );
}

export default OverviewPage;
