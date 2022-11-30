import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { getWeekNumberByDate } from "../../../utils/utils";

interface Consumptions {
  consumptionId: number;
  timeInterval: Date;
  heatDemand: number;
  electricityDemand: number;
  electricityPrice: number;
  gasPrice: number;
  siteId: number;
  orgId: number;
}

interface WeekConsumption {
  weekNumber: number;
  consumption: number;
}

const consumptionsService = new ConsumptionsService();

function Graph() {
  const [consumption, setConsumption] = useState({weekNumber:[], electricityDemand:[]});

  const graphData = async () => {
    const consumptions = await consumptionsService.getAllConsumptions();
    const weekNumber: any = [];
    const electricityDemand: any = [];
    const currentWeekNumber = getWeekNumberByDate(new Date());
    const previousWeekNumber = currentWeekNumber - 1;
    const weekConsumptionArray: Array<WeekConsumption> = [];

    consumptions.data.forEach((element: Consumptions) => {
      console.log(typeof(element.electricityDemand));
      const weekNumber = getWeekNumberByDate(element.timeInterval);
      if (weekNumber === currentWeekNumber || weekNumber === previousWeekNumber) {
        const obj: WeekConsumption = {
          weekNumber: weekNumber,
          consumption: element.electricityDemand
        }
        const result = weekConsumptionArray.find((x: WeekConsumption) => x.weekNumber == weekNumber);
        if (result) result.consumption += element.electricityDemand;
        else weekConsumptionArray.push(obj);
      }
    });

    weekConsumptionArray.forEach((data: WeekConsumption) => {
      if (data.weekNumber == currentWeekNumber) {
        weekNumber.push("Current Week");
      }
      else {
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
    <div className="graph" >
      <Plot
        data={[
          {
            x: consumption.weekNumber,
            y: consumption.electricityDemand,
            type: 'bar',
            marker: {
              color: ['rgba(1, 93, 251, 0.8)', 'rgba(248, 119, 16, 0.8)']
            }
          },
        ]}
        layout={
          {
            width: 450,
            height: 450,
            title: 'Electricity Usage',
            xaxis: {
              title: 'Week',
              titlefont: {
                family: 'Ariel',
                size: 13
              }
            },
            yaxis: {
              title: 'Electricity Consumption',
              titlefont: {
                family: 'Ariel',
                size: 13
              }
            }
          }
        }
      />
    </div>
  )
};

export default Graph;