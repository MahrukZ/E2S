import { Container } from "react-bootstrap";
import ReportsDatePicker from "../reusable/datePicker/ReportsDatePicker";

interface ReportsProps {
    currentSite: any;
}

function Reports({ currentSite }: ReportsProps) {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="reportsContainer"
        >
            <ReportsDatePicker currentSite={currentSite} />
        </Container>
    );
}

export default Reports;
