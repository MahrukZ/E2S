import Insights from "../reusable/insights/Insights";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

interface DashboardProps {
    currentSite: any;
}

function Dashboard({ currentSite }: DashboardProps) {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="dashboardContainer"
        >
            <Insights />
            <DashboardGraphs currentSite={currentSite} />
        </Container>
    );
}

export default Dashboard;
