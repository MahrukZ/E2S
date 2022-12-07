import DatePicker from "../reusable/datePicker/DatePicker";
import { Container } from "react-bootstrap";

function BillValidation() {
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="BillValidation"
        >
            <DatePicker />
        </Container>
    );
}

export default BillValidation;
