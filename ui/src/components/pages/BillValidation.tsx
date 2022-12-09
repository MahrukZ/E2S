import DatePicker from "../reusable/datePicker/DatePicker";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

interface BillValidationProps {
    currentSite: any;
    setTopbarTitle: any;
}

function BillValidation({ currentSite, setTopbarTitle }: BillValidationProps) {
    useEffect(() => {
        setTopbarTitle("Bill Validation");
        document.title = "Bill Validation";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
