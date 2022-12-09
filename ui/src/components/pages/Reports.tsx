import { Container } from "react-bootstrap";
import { useEffect } from "react";
import ReportsDatePicker from "../reusable/datePicker/ReportsDatePicker";

interface ReportsProps {
    currentSite: any;
    setTopbarTitle: any;
}

function Reports({ currentSite, setTopbarTitle }: ReportsProps) {
    useEffect(() => {
        setTopbarTitle("Reports");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
