import { Container } from "react-bootstrap";
import ReportsGraphs from "../reusable/graphs/ReportsGraphs";
import ReportsInsights from "../reusable/insights/ReportsInsights";

function Reports() {
    return (
        <Container fluid className="d-flex flex-column" data-testid="reportsContainer">   
            <ReportsInsights />
            <ReportsGraphs />
        </Container>
    );
};

export default Reports;
