import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
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
    const weekNumber: any = [];
    const electricityDemand: any = [];

    const currentWeekNumber = getWeekNumberByDate(new Date());
    const previousWeekNumber = currentWeekNumber - 1;

    const weekConsumptionArray: Array<WeekConsumption> = [];
    consumptions.data.forEach((element: Consumptions) => {
      const weekNumber = getWeekNumberByDate(element.time_interval);
      if (weekNumber === currentWeekNumber || weekNumber === previousWeekNumber) {
        const obj: WeekConsumption = {
          weekNumber: weekNumber,
          consumption: element.electricity_demand
        }
        const result = weekConsumptionArray.find((x: WeekConsumption) => x.weekNumber == weekNumber);
        if (result) result.consumption += element.electricity_demand;
        else weekConsumptionArray.push(obj);
      }
    });

    weekConsumptionArray.forEach((data: WeekConsumption) => {

      if(data.weekNumber == currentWeekNumber){
        weekNumber.push("Current Week");
      }
      else{
        weekNumber.push("Previous Week");
      }
      electricityDemand.push(data.consumption);
    });

    setConsumption({ ...weekConsumptionArray, weekNumber: weekNumber, electricityDemand: electricityDemand });
    return weekConsumptionArray;
  }

  useEffect(() => {
    graphData();
  }
    , [])

  return (
    <div className="graph">
      
    </div>
  )
};

export default Graph;