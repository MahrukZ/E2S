import React from 'react';
import Insights from "../reusable/insights/insights";
import Graph from "../reusable/graphs/Graph";

const Dashboard: React.FunctionComponent = () => {
    return (
        <div>
        <Insights></Insights>
        <Graph></Graph>
        </div>
    );
};

export default Dashboard;