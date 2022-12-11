import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { ConsumptionsService } from "../../../services/consumptions.service";
import "./Graph.css";
import SingleGraph, { ISingleGraph } from "./SingleGraph";
import DoubleGraph, { IDoubleGraph } from "./DoubleGraph";

interface DashboardGraphsProps {
  currentSite: any;
}

function DashboardGraphs({ currentSite }: DashboardGraphsProps) {
  const [isLoading, setLoading] = useState<Boolean>(false);

  const [electricityGraph, setElectricityGraph] = useState<ISingleGraph>({
    xData: [],
    yData: [],
    xName: "",
    yName: "",
    lineColour: "",
    width: "0px",
  });

  const [gasGraph, setGasGraph] = useState<ISingleGraph>({
    xData: [],
    yData: [],
    xName: "",
    yName: "",
    lineColour: "",
    width: "0px",
  });

  const [emissionsGraph, setEmissionsGraph] = useState<ISingleGraph>({
    xData: [],
    yData: [],
    xName: "",
    yName: "",
    lineColour: "",
    width: "0px",
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
    name1: "",
  });

  useEffect(() => {
    const consumptionsService = new ConsumptionsService();

    const findAllConsumptionsBySiteIdAndTime = async () => {
      let electricityData = [];
      let gasData = [];
      let emissionsData = [];
      let timeData = [];
      let electricityCostData = [];
      let gasCostData = [];

      const now = new Date();
      const priorDate = new Date(new Date().setDate(now.getDate() - 30));
      setLoading(true);

      const currentConsumptionsResponse =
        await consumptionsService.findAllConsumptionsBySiteIdAndTime(
          priorDate,
          now,
          currentSite
        );

      const currentConsumptionsData = currentConsumptionsResponse["data"];

      for (let i = 0; i < currentConsumptionsData.length; i++) {
        const formattedElectricityDemand = parseFloat(
          currentConsumptionsData[i]["electricityDemand"]
        );
        electricityData.push(formattedElectricityDemand);

        const formattedGasDemand = parseFloat(
          currentConsumptionsData[i]["heatDemand"]
        );
        gasData.push(formattedGasDemand);

        const formattedEmissions = parseFloat(
          currentConsumptionsData[i]["co2Emissions"]
        );
        emissionsData.push(formattedEmissions);

        const formattedDate = new Date(
          currentConsumptionsData[i]["timeInterval"]
        );
        timeData.push(formattedDate);

        const electricityCost =
          (parseFloat(currentConsumptionsData[i]["electricityDemand"]) *
            parseFloat(currentConsumptionsData[i]["electricityPrice"])) /
          100;
        electricityCostData.push(electricityCost);

        const gasCost =
          (parseFloat(currentConsumptionsData[i]["heatDemand"]) *
            parseFloat(currentConsumptionsData[i]["gasPrice"])) /
          100;
        gasCostData.push(gasCost);
      }

      setElectricityGraph({
        xData: timeData,
        yData: electricityData,
        xName: "date",
        yName: "Electricity Consumption (kWh)",
        lineColour: "#0d609d",
        width: "600px",
      });

      setGasGraph({
        xData: timeData,
        yData: gasData,
        xName: "date",
        yName: "Gas Consumption (kWh)",
        lineColour: "#f15a2f",
        width: "600px",
      });

      setEmissionsGraph({
        xData: timeData,
        yData: emissionsData,
        xName: "date",
        yName: "CO2 Emissions (kgCO2e)",
        lineColour: "#a4ba71",
        width: "600px",
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
        name1: "Gas",
      });
      setLoading(false);
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
        <SingleGraph graphData={electricityGraph} isLoading={isLoading} />

        <SingleGraph graphData={gasGraph} isLoading={isLoading} />

        <SingleGraph graphData={emissionsGraph} isLoading={isLoading} />
      </Col>

      <Col className="d-flex graphContainer">
        <DoubleGraph graphData={costsGraph} isLoading={isLoading} />
      </Col>
    </Container>
  );
}

export default DashboardGraphs;
