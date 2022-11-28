import { useState } from "react";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { getWeekNumberByDate } from "../../../utils/utils";

const consumptionsService = new ConsumptionsService();

function Graph() {
  const [consumption, setConsumption] = useState({ weekNumber: [], electricityDemand: [] });

  const graphData = async () => {
    const consumptions = await consumptionsService.getAllConsumptions();
    const currentWeekNumber = getWeekNumberByDate(new Date());
  };
  return (
    <>
    </>
  )
};

export default Graph;

