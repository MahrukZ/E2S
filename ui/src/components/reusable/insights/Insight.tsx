import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { IDashboardInsights } from "./DashboardInsights";
import "./Insights.css";

interface InsightProps {
    insightData: IDashboardInsights
}

function Insight({ insightData }: InsightProps) {
    console.log(insightData);
  
    return (
        <Card className="insightsCard flex-fill" data-testid="insightsCost">
            <Card.Title>{insightData.title}</Card.Title>
            <Card.Body>
                {insightData.insightList[0]} 
                <b className="percentageNeutral" 
                    style={{
                        backgroundColor: insightData.isPositive ? 'darkred' : 'green',
                    }}>
                    {insightData.percentage}%
                </b>
                {insightData.insightList[1]}
            </Card.Body>
        </Card>
    );
};

export default Insight;