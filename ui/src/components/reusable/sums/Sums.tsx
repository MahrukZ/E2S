import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ISums } from "./../datePicker/DatePicker";
import "./Sums.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { SitesService } from "../../../services/sites.service";
import ReactLoading from "react-loading";

interface ISumsProps {
  betweenDates: ISums;
  currentSite: any;
}

function Sums({ betweenDates, currentSite }: ISumsProps) {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const currentSiteId = currentSite;

  const [consumptionsList, setConsumptionsList] = useState<String[]>([]);
  const [siteName, setSiteName] = useState<String>();
  const [dateRange, setDateRange] = useState<String[]>([]);

  const consumptionsService = new ConsumptionsService();
  const sitesService = new SitesService();

  useEffect(() => {
    const findSumOfConsumptionsBySiteIdAndTime = async () => {
      setLoading(true);
      let finalConsumptions: String[] = [];

      let stringElectricityDemand: String;
      let stringGasDemand: String;
      let stringTotalCosts: String;
      let stringElectricityCosts: String;
      let stringGasCosts: String;

      let now: Date = betweenDates.dateRange[0]["endDate"]!;
      let priorDate: Date = betweenDates.dateRange[0]["startDate"]!;

      const siteData = await sitesService.findSiteById(currentSiteId);

      const currentSite = siteData["data"][0]["name"];

      const consumptionsResponse =
        await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(
          priorDate,
          now,
          currentSiteId
        );

      const consumptionsData = consumptionsResponse["data"];

      const from = priorDate.toLocaleDateString("en-GB");
      const to = now.toLocaleDateString("en-GB");

      if (from !== to) {
        stringElectricityDemand = Math.round(
          consumptionsData[0]
        ).toLocaleString();
        stringGasDemand = Math.round(consumptionsData[1]).toLocaleString();
        stringTotalCosts = Math.round(consumptionsData[3]).toLocaleString();
        stringElectricityCosts = Math.round(
          consumptionsData[4]
        ).toLocaleString();
        stringGasCosts = Math.round(consumptionsData[5]).toLocaleString();
      } else {
        stringElectricityDemand = (0).toLocaleString();
        stringGasDemand = (0).toLocaleString();
        stringTotalCosts = (0).toLocaleString();
        stringElectricityCosts = (0).toLocaleString();
        stringGasCosts = (0).toLocaleString();
      }

      finalConsumptions.push(
        stringElectricityDemand,
        stringGasDemand,
        stringTotalCosts,
        stringElectricityCosts,
        stringGasCosts
      );

      setDateRange([from, to]);
      setConsumptionsList(finalConsumptions);
      setSiteName(currentSite);
      setLoading(false);
    };
    findSumOfConsumptionsBySiteIdAndTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betweenDates]);

  return (
    <Card className="flex-shrink-1 sumsCard" data-testid="sumsElement">
      <Card.Title>
        Between {dateRange[0]} and {dateRange[1]} {siteName} had:
      </Card.Title>
      {isLoading ? (
        <ReactLoading
          className="loaderAlignment"
          type="spin"
          color="#FFFFFF"
          height={"20%"}
          width={"20%"}
        />
      ) : (
        <Card.Body>
          <p></p>
          <p>
            <b>Electricity Demand: {consumptionsList[0]} kWh</b>
          </p>
          <p>
            <b>Gas Demand: {consumptionsList[1]} kWh</b>
          </p>
          <p>
            <b>Electricity Costs: £ {consumptionsList[3]}</b>
          </p>
          <p>
            <b>Gas Costs: £ {consumptionsList[4]}</b>
          </p>
          <p>
            <b>Total Costs: £ {consumptionsList[2]}</b>
          </p>
        </Card.Body>
      )}
    </Card>
  );
}

export default Sums;
