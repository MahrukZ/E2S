import { useState } from "react";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { getWeekNumberByDate } from "../../../utils/utils";

interface Consumptions {
  consumption_id: number;
  time_interval: Date;
  heat_demand: number;
  electricity_demand: number;
  electricity_price: number;
  gas_price: number;
  site_id: number;
  org_id: number;
}

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

