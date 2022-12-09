import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import Insights from "../reusable/insights/Insights";

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
            <Insights currentSite={currentSite} />
            <DashboardGraphs currentSite={currentSite} />
        </Container>
    );
}

export default Dashboard;
