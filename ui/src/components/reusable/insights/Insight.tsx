import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./Insights.css";

export interface IInsightData {
    title: string;
    insightList: String[];
    data?: String;
    percentage?: String;
    isPositive?: boolean;
}

interface InsightProps {
    insightData: IInsightData;
}

function Insight({ insightData }: InsightProps) {
    return (
        <Card className="insightsCard flex-fill" data-testid="insight">
            <Card.Title>{insightData.title}</Card.Title>
            <Card.Body>
                {insightData.insightList[0]}
                {insightData.isPositive !== undefined && (
                    <b
                        className="percentageNeutral"
                        style={{
                            backgroundColor: insightData.isPositive
                                ? "darkred"
                                : "green",
                        }}
                    >
                        {insightData.percentage
                            ? insightData.percentage + "%"
                            : ""}
                    </b>
                )}
                <b>{insightData.data ? insightData.data : ""}</b>
                {insightData.insightList[1]}
            </Card.Body>
        </Card>
    );
}

export default Insight;
