import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { InsightsService } from "../../../services/insights.service";
import { SitesService } from "../../../services/sites.service";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { Container, Col } from "react-bootstrap";
import "./Insights.css";
import Insight, { IInsightData } from "./Insight";

function ReportsInsights() {
  const currentSiteId = 1;

  const [costsInsight, setCostsInsight] = useState<IInsightData>({
    title: "",
    insightList: [],
    data: "",
  });

  const [electricityInsight, setElectricityInsight] = useState<IInsightData>({
    title: "",
    insightList: [],
    data: "",
  });

  const [gasInsight, setGasInsight] = useState<IInsightData>({
    title: "",
    insightList: [],
    data: "",
  });

  const [emissionsInsight, setEmissionsInsight] = useState<IInsightData>({
    title: "",
    insightList: [],
    data: "",
  });

  // Initialize services
  const insightsService = new InsightsService();
  const sitesService = new SitesService();
  const consumptionsService = new ConsumptionsService();

  useEffect(() => {
    let costsInsightsList: String[] = [];
    let electricityInsightsList: String[] = [];
    let gasInsightsList: String[] = [];
    let emissionsInsightsList: String[] = [];

    const now = new Date();
    const firstDayOfTheWeek = now.getDate() - now.getDay() + 1;
    const lastDayOfTheWeek = firstDayOfTheWeek + 6;
    const firstDayOfLastWeek = new Date(now.setDate(firstDayOfTheWeek - 7));
    const lastDayOfLastWeek = new Date(now.setDate(lastDayOfTheWeek - 7));

    // This will only work with 3 insight templates in the database
    const getAllInsights = async () => {
      let finalInsights: String[] = [];
      let insightsList: String[] = [];

      const insightsTemplates = await insightsService.getInsights();
      // Currently just has 1 as the siteId, this will need to be changed
      const siteData = await sitesService.findSiteById(currentSiteId);

      const currentSite = siteData["data"][0]["name"];

      // Replace [site] in the template with site name
      for (let i = 4; i < 8; i++) {
        let currentInsight0: string = String(
          insightsTemplates["data"][i]["description"]
        );

        currentInsight0 = currentInsight0.replace("[site]", currentSite);
        currentInsight0 = currentInsight0.replace(
          "[dateFrom]",
          String(firstDayOfLastWeek.toLocaleDateString("en-GB"))
        );
        currentInsight0 = currentInsight0.replace(
          "[dateTo]",
          String(lastDayOfLastWeek.toLocaleDateString("en-GB"))
        );

        insightsList.push(currentInsight0);
      }

      // Split the insight template in half so the data can go into the middle
      for (let i = 0; i < insightsList.length; i++) {
        const currentInsight1: string = String(insightsList[i]);

        const splitted = currentInsight1.split("[data]");

        finalInsights.push(splitted[0]);
        finalInsights.push(splitted[1]);
      }
      costsInsightsList = [finalInsights[0], finalInsights[1]];
      electricityInsightsList = [finalInsights[2], finalInsights[3]];
      gasInsightsList = [finalInsights[4], finalInsights[5]];
      emissionsInsightsList = [finalInsights[6], finalInsights[7]];
    };
    getAllInsights();

    const findSumOfConsumptionsBySiteIdAndTime = async () => {
      const lastWeekConsumptionsResponse =
        await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(
          lastDayOfLastWeek,
          firstDayOfLastWeek,
          currentSiteId
        );

      const lastWeekConsumptionsData = lastWeekConsumptionsResponse["data"];

      const totalElectricityDemand =
        Math.round(lastWeekConsumptionsData[0]).toLocaleString() + " kWh";
      const totalGasDemand = Math.round(lastWeekConsumptionsData[1]).toLocaleString() + " kWh";
      const totalEmissions =
        Math.round(lastWeekConsumptionsData[2]).toLocaleString() + " kgCO2e";
      const totalCosts =
        "£" + Math.round(lastWeekConsumptionsData[3]).toLocaleString();

      setCostsInsight({
        title: "Total Costs",
        insightList: costsInsightsList,
        data: totalCosts,
      });

      setElectricityInsight({
        title: "Electricity Insight",
        insightList: electricityInsightsList,
        data: totalElectricityDemand,
      });

      setGasInsight({
        title: "Gas Insight",
        insightList: gasInsightsList,
        data: totalGasDemand,
      });

      setEmissionsInsight({
        title: "CO2 Emissions Insight",
        insightList: emissionsInsightsList,
        data: totalEmissions,
      });
    };
    findSumOfConsumptionsBySiteIdAndTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="justify-content-center">
      <Col className="d-flex insightsCol">
        <Insight insightData={costsInsight} />

        <Insight insightData={electricityInsight} />

        <Insight insightData={gasInsight} />

        <Insight insightData={emissionsInsight} />
      </Col>
    </Container>
  );
}

export default ReportsInsights;
