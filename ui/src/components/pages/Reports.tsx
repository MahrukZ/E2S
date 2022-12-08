import { Container } from "react-bootstrap";
import ReportsDatePicker from "../reusable/datePicker/ReportsDatePicker";

function Reports() {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="reportsContainer"
        >
            <ReportsDatePicker />
        </Container>
    );
};

export default Reports;
