import Insights from "../reusable/insights/Insights";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function Dashboard() {
    return (
        <Container fluid className="d-flex flex-column">     
            <Insights />
            <DashboardGraphs />
        </Container>
    );
};

export default Dashboard;