import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./Graph.css";
import { ConsumptionsService } from "../../../services/consumptions.service";

interface IConsumption {
  consumptionId: number;
  timeInterval: Date;
  heatDemand: number;
  electricityDemand: string;
  electricityPrice: number;
  gasPrice: number;
  siteId: number;
  orgId: number;
}

interface IWeekConsumption {
  weekNumber: number;
  consumption: string;
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
    const weekConsumptionArray: Array<IWeekConsumption> = [];

    consumptions.data.forEach((element: IConsumption) => {
      const weekNumber = getWeekNumberByDate(element.timeInterval);
      const consumption = Number(element.electricityDemand);
      if (weekNumber === currentWeekNumber || weekNumber === previousWeekNumber) {
        const obj: any = {
          weekNumber: weekNumber,
          consumption: consumption
        }
        const result = weekConsumptionArray.find((x: IWeekConsumption) => x.weekNumber === weekNumber);
        if (result) result.consumption += consumption;
        else weekConsumptionArray.push(obj);
      }
    });

    weekConsumptionArray.forEach((data: IWeekConsumption) => {
      if (data.weekNumber === currentWeekNumber) {
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
    <div className="graph" data-testid="electricityGraph">
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
                family: 'Arial',
                size: 13
              }
            },
            yaxis: {
              title: 'Electricity Consumption (kW)',
              titlefont: {
                family: 'Arial',
                size: 13
              }
            }
          }
        }
      />
    </div>
  )
};

function getWeekNumberByDate(date: any) {
  date = new Date(date).toLocaleDateString();
  date = new Date(date);
  const firstJanuary: any = new Date(date.getFullYear(), 0, 4);
  const dayNumber: number = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
  const weekNumber: number = Math.ceil((dayNumber + firstJanuary.getDay()) / 7);
  return weekNumber;
}

export default Graph;