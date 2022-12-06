import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { ConsumptionsService } from "../../../services/consumptions.service";
import "./Graph.css";
import SingleGraph from "./SingleGraph";
import DoubleGraph from "./DoubleGraph";

export interface ISingleGraph {
    xData: Date[],
    yData: number[],
    xName: string,
    yName: string,
    lineColour: string
}

export interface IDoubleGraph {
    xData0: Date[],
    yData0: number[],
    yData1: number[],
    xName: string,
    yName: string,
    lineColour0: string,
    lineColour1: string,
    name0: string,
    name1: string
}

function DashboardGraphs() {

    const currentSiteId = 1;

    const [electricityGraph, setElectricityGraph] = useState<ISingleGraph>({
        xData: [],
        yData: [],
        xName: "",
        yName: "",
        lineColour: ""
    });

    const [gasGraph, setGasGraph] = useState<ISingleGraph>({
        xData: [],
        yData: [],
        xName: "",
        yName: "",
        lineColour: ""
    });

    const [emissionsGraph, setEmissionsGraph] = useState<ISingleGraph>({
        xData: [],
        yData: [],
        xName: "",
        yName: "",
        lineColour: ""
    });

    const [costsGraph, setCostsGraph] = useState<IDoubleGraph>({
        xData0: [],
        yData0: [],
        yData1: [],
        xName: "",
        yName: "",
        lineColour0: "",
        lineColour1: "",
        name0: "",
        name1: ""
    });

    const consumptionsService = new ConsumptionsService();

    useEffect(() => {
        const findAllConsumptionsBySiteIdAndTime = async () => {
            let electricityData = [];
            let gasData = [];
            let emissionsData = [];
            let timeData = [];
            let electricityCostData = [];
            let gasCostData = [];

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 30));

            const currentConsumptionsResponse = await consumptionsService.findAllConsumptionsBySiteIdAndTime(priorDate, now, currentSiteId);

            const currentConsumptionsData = currentConsumptionsResponse["data"];

            for (let i = 0; i < currentConsumptionsData.length; i++) {
                const formattedElectricityDemand = parseFloat(currentConsumptionsData[i]["electricityDemand"]);
                electricityData.push(formattedElectricityDemand);

                const formattedGasDemand = parseFloat(currentConsumptionsData[i]["heatDemand"]);
                gasData.push(formattedGasDemand);

                const formattedEmissions = parseFloat(currentConsumptionsData[i]["co2Emissions"]);
                emissionsData.push(formattedEmissions);

                const formattedDate = new Date(currentConsumptionsData[i]["timeInterval"]);
                timeData.push(formattedDate);

                const electricityCost = parseFloat(currentConsumptionsData[i]["electricityDemand"]) * parseFloat(currentConsumptionsData[i]["electricityPrice"]);
                electricityCostData.push(electricityCost);

                const gasCost = parseFloat(currentConsumptionsData[i]["heatDemand"]) * parseFloat(currentConsumptionsData[i]["gasPrice"]);
                gasCostData.push(gasCost);
            };

            setElectricityGraph({
                xData: timeData,
                yData: electricityData,
                xName: "date",
                yName: "Electricity Consumption (kWh)",
                lineColour: "#0d609d"
            });

            setGasGraph({
                xData: timeData,
                yData: gasData,
                xName: "date",
                yName: "Gas Consumption (kWh)",
                lineColour: "#f15a2f"
            });

            setEmissionsGraph({
                xData: timeData,
                yData: emissionsData,
                xName: "date",
                yName: "CO2 Emissions (kgCO2e)",
                lineColour: "#a4ba71"
            });

            setCostsGraph({
                xData0: timeData,
                yData0: electricityCostData,
                yData1: gasCostData,
                xName: "date",
                yName: "Cost (£)",
                lineColour0: "#0d609d",
                lineColour1: "#f15a2f",
                name0: "Electricity",
                name1: "Gas"
            });
        }

        findAllConsumptionsBySiteIdAndTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className="justify-content-center">
            <Col className="d-flex graphContainer">

                <SingleGraph graphData={electricityGraph} />

                <SingleGraph graphData={gasGraph} />

                <SingleGraph graphData={emissionsGraph} />

            </Col>

            <Col className="d-flex graphContainer">

                <DoubleGraph graphData={costsGraph} />

            </Col>
        </Container>

    );
};

export default DashboardGraphs;