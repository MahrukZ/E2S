import ReportsGraphs from "../reusable/graphs/ReportsGraphs";
import ReportsInsights from "../reusable/insights/ReportsInsights";

function Reports() {
    return (
        <>
            <h1 id="reports">Reports</h1>
            <ReportsInsights />
            <ReportsGraphs />
        </>
    );
};

export default Reports;
