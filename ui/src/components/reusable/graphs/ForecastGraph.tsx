import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Col, Card } from "react-bootstrap";
import { ConsumptionsService } from "../../../services/consumptions.service";
import "./Graph.css";
import DoubleGraph from "./DoubleGraph";
import { addDays } from "date-fns";

export interface IDoubleGraph {
    xData0: Date[];
    yData0: number[];
    yData1: number[];
    xName: string;
    yName: string;
    lineColour0: string;
    lineColour1: string;
    name0: string;
    name1: string;
}

interface ForecastGraphProps {
    currentSite: any;
}

function ForecastGraph({ currentSite }: ForecastGraphProps) {
    const currentSiteId = currentSite;

    const [costsGraph, setCostsGraph] = useState<IDoubleGraph>({
        xData0: [],
        yData0: [],
        yData1: [],
        xName: "",
        yName: "",
        lineColour0: "",
        lineColour1: "",
        name0: "",
        name1: "",
    });

    const [yearCosts, setYearCosts] = useState<String[]>(["", ""]);

    useEffect(() => {
        const consumptionsService = new ConsumptionsService();

        const findAllConsumptionsBySiteIdAndTime = async () => {
            let timeData = [];
            let totalCostData = [];
            let predictedCostData = [];
            let thisYearCost = 0;
            let nextYearCost = 0;

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 365));

            const consumptionsResponse =
                await consumptionsService.findAllConsumptionsBySiteIdAndTime(
                    priorDate,
                    now,
                    currentSiteId
                );

            const currentConsumptionsData = consumptionsResponse["data"];

            let current = 0;
            let predicted = 0;

            for (let i = 0; i < currentConsumptionsData.length; i++) {
                const formattedDate = addDays(
                    new Date(currentConsumptionsData[i]["timeInterval"]),
                    +365
                );

                const electricityCost =
                    (parseFloat(
                        currentConsumptionsData[i]["electricityDemand"]
                    ) *
                        parseFloat(
                            currentConsumptionsData[i]["electricityPrice"]
                        )) /
                    100;

                const gasCost =
                    (parseFloat(currentConsumptionsData[i]["heatDemand"]) *
                        parseFloat(currentConsumptionsData[i]["gasPrice"])) /
                    100;

                current = current + electricityCost + gasCost;
                predicted = predicted + electricityCost * 2 + gasCost * 1.45;

                if (i % 48 === 0) {
                    timeData.push(formattedDate);
                    totalCostData.push(current);
                    predictedCostData.push(predicted);
                    thisYearCost = thisYearCost + current;
                    nextYearCost = nextYearCost + predicted;
                    current = 0;
                    predicted = 0;
                }
                timeData.push();
            }

            setYearCosts([
                Math.round(thisYearCost).toLocaleString(),
                Math.round(nextYearCost).toLocaleString(),
            ]);

            setCostsGraph({
                xData0: timeData,
                yData0: totalCostData,
                yData1: predictedCostData,
                xName: "date",
                yName: "Cost (£)",
                lineColour0: "#0d609d",
                lineColour1: "#f15a2f",
                name0: "Last 365 days",
                name1: "Predicted next 365 days",
            });
        };

        findAllConsumptionsBySiteIdAndTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            fluid
            className="justify-content-center"
            data-testid="graphContainer"
        >
            <Col className="d-flex graphContainer">
                <DoubleGraph graphData={costsGraph} />
                <Card className="costsCard">
                    <Card.Title>Total Costs:</Card.Title>
                    <Card.Body>
                        <br></br>
                        <p>
                            <b>Last 365 days total cost: </b>
                        </p>
                        <p>
                            <b>£ {yearCosts[0]}</b>
                        </p>
                        <br></br>
                        <p>
                            <b>Next 365 days predicted cost:</b>
                        </p>
                        <p>
                            <b>£ {yearCosts[1]}</b>
                        </p>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}

export default ForecastGraph;
