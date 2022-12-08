import DashboardInsights from '../reusable/insights/DashboardInsights';
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function Dashboard() {
    return (
        <Container fluid className="d-flex flex-column" data-testid="dashboardContainer">     
            <DashboardInsights />
            <DashboardGraphs />
        </Container>
    );
};

export default Dashboard;