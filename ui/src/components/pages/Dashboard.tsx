import Insights from "../reusable/insights/Insights";
import { useState, useEffect } from "react";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

interface DashboardProps {
    currentSite: any;
}

function Dashboard({ currentSite }: DashboardProps) {
    const [value, setValue] = useState(currentSite);
    useEffect(() => {
        setValue(currentSite);
    }, [currentSite]);

    console.log("rendering dashboard");
    return (
        <Container
            fluid
            className="d-flex flex-column"
            data-testid="dashboardContainer"
        >
            <Insights />
            <DashboardGraphs currentSite={currentSite} key={currentSite} />
        </Container>
    );
}

export default Dashboard;
