import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import Insights from "../reusable/insights/Insights";

interface DashboardProps {
    currentSite: any;
    setTopbarTitle: any;
}

function Dashboard({ currentSite, setTopbarTitle }: DashboardProps) {
    useEffect(() => {
        setTopbarTitle("Dashboard");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="dashboardContainer"
        >
            <Insights currentSite={currentSite} />
            <DashboardGraphs currentSite={currentSite} />
        </Container>
    );
}

export default Dashboard;
