import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserManagementCard from "./UserManagementCard";
import "./OverviewCols.css";
import SiteManagementCard from "./SiteManagementCard";

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
        <Container id="overviewContainer" className="mt-5">
            <Row className="cardRow">
                <UserManagementCard />
                <SiteManagementCard />
            </Row>
        </Container>
    );
}

export default OverviewPage;
