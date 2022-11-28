import { useState } from "react";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { getWeekNumberByDate } from "../../../utils/utils";

interface WeekConsumption {
  weekNumber: number;
  consumption: number;
}

const consumptionsService = new ConsumptionsService();

function Graph() {
  const [consumption, setConsumption] = useState({ weekNumber: [], electricityDemand: [] });

  const graphData = async () => {
    const consumptions = await consumptionsService.getAllConsumptions();
    const currentWeekNumber = getWeekNumberByDate(new Date());
    const previousWeekNumber = currentWeekNumber - 1;

    const weekConsumptionArray: Array<WeekConsumption> = [];
    };

  return (
    <>
    </>
  )
};

export default Graph;

