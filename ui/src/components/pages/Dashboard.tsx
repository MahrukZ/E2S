import Graph from '../reusable/graphs/Graph';
import Insights from '../reusable/insights/Insights';

function Dashboard() {
    return (
        <div>
        <h1 id='dashboard'>Dashboard</h1>
        <Insights />
        <Graph />
        </div>
    );
};

export default Dashboard;