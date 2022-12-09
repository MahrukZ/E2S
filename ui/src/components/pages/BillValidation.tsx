import DatePicker from "../reusable/datePicker/DatePicker";
import { Container } from "react-bootstrap";

interface BillValidationProps {
    currentSite: any;
}

function BillValidation({ currentSite }: BillValidationProps) {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="BillValidation"
        >
            <DatePicker currentSite={currentSite} />
        </Container>
    );
}

export default BillValidation;
