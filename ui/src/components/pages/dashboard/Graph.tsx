import { useState } from "react";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";

const consumptionsService = new ConsumptionsService();

function Graph() {
  const [consumption, setConsumption] = useState({ weekNumber: [], electricityDemand: [] });

  const graphData = async () => {
    const consumptions = await consumptionsService.getAllConsumptions();
  };
  return (
    <>
    </>
  )
};

export default Graph;

