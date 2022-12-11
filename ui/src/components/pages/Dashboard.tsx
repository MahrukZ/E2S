import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import DashboardInsights from "../reusable/insights/DashboardInsights";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";

interface DashboardProps {
    currentSite: any;
    setTopbarTitle: any;
}

function Dashboard({ currentSite, setTopbarTitle }: DashboardProps) {
    useEffect(() => {
        setTopbarTitle("Dashboard");
        document.title = "Dashboard";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="dashboardContainer"
        >
            <DashboardInsights currentSite={currentSite} />
            <DashboardGraphs currentSite={currentSite} />
        </Container>
    );
}

export default Dashboard;
