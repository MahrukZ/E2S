import React from 'react';
import Insights from "../reusable/insights/insights";
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Col } from "react-bootstrap";

const Dashboard: React.FunctionComponent = () => {
    return (
        <Container fluid className="d-flex flex-column">     
        <Insights></Insights>
        <DashboardGraphs></DashboardGraphs>
        </Container>
    );
};

export default Dashboard;