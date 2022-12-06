import React from 'react';
import DashboardGraphs from "../reusable/graphs/DashboardGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Col } from "react-bootstrap";
import Insights from '../reusable/insights/Insights';

function Dashboard() {
    return (
        <Container fluid className="d-flex flex-column">     
        <Insights></Insights>
        <DashboardGraphs></DashboardGraphs>
        </Container>
    );
};

export default Dashboard;