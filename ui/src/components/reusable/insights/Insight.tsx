import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./Insights.css";

export interface IInsightData {
    title: string,
    insightList: String[],
    data?: String,
    percentage?: String,
    isPositive?: Boolean
}

interface InsightProps {
    insightData: IInsightData
}

function Insight({ insightData }: InsightProps) {
    console.log(insightData);
  
    return (
      <Card className="insightsCard flex-fill" data-testid="insightsCost">
        <Card.Title>{insightData.title}</Card.Title>
        <Card.Body>
          {insightData.insightList[0]}
          <b
            className="percentageNeutral"
            style={{
              backgroundColor: insightData.isPositive ? "darkred" : "green",
            }}
          >
            {insightData.percentage ? insightData.percentage + "%" : ""}
            {insightData.data ? insightData.data : ""}
          </b>
          {insightData.insightList[1]}
        </Card.Body>
      </Card>
    );
};

export default Insight;