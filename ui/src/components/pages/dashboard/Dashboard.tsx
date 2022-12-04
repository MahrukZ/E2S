import Graph from "../../reusable/graphs/Graph";
import Insights from "../../reusable/insights/insights";

function Dashboard() {
  return (
    <>
    <h1 id="dashboard" >Dashboard</h1>
    <div className="fluid">
      <Insights />
      <Graph />
    </div>
    </>
  );
};

export default Dashboard;