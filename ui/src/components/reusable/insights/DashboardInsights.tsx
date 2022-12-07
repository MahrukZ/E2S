import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { InsightsService } from "../../../services/insights.service";
import { SitesService } from "../../../services/sites.service";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { Container, Col } from "react-bootstrap";
import "./Insights.css";
import Insight, { IInsightData } from "./Insight";

function DashboardInsights() {
  
    const currentSiteId = 1;

    const [costsInsight, setCostsInsight] = useState<IInsightData>({
        title: "",
        insightList: [],
        percentage: "",
        isPositive: false
    });

    const [electricityInsight, setElectricityInsight] = useState<IInsightData>({
        title: "",
        insightList: [],
        percentage: "",
        isPositive: false
    });

    const [gasInsight, setGasInsight] = useState<IInsightData>({
        title: "",
        insightList: [],
        percentage: "",
        isPositive: false
    });

    const [emissionsInsight, setEmissionsInsight] = useState<IInsightData>({
      title: "",
      insightList: [],
      percentage: "",
      isPositive: false,
    });
    
    // Sets the colour based on whether the change or positive or negative
    const [isElectricityPositive, setIsElectricityPositive] = useState(false);
    const [isGasPositive, setIsGasPositive] = useState(false);
    const [isEmissionsPositive, setIsEmissionsPositive] = useState(false);
    const [isCostPositive, setIsCostPositive] = useState(false);

    // Initialize services
    const insightsService = new InsightsService();
    const sitesService = new SitesService();
    const consumptionsService = new ConsumptionsService();

    useEffect(() => {
        let costsInsightsList: String[] = [];
        let electricityInsightsList: String[] = [];
        let gasInsightsList: String[] = [];
        let emissionsInsightsList: String[] = [];

        // This will only work with 3 insight templates in the database
        const getAllInsights = async () => {
            let finalInsights: String[] = [];
            let insightsList: String[] = [];

            const insightsTemplates = await insightsService.getInsights();
            // Currently just has 1 as the siteId, this will need to be changed
            const siteData = await sitesService.findSiteById(currentSiteId);

            const currentSite = siteData["data"][0]["name"];

            // Replace [site] in the template with site name
            for (let i = 0; i < 4; i++ ) {
                const currentInsight0: string = String(insightsTemplates["data"][i]["description"]);

                const insightToAdd0 = currentInsight0.replace("[site]", currentSite)

                insightsList.push(insightToAdd0);
            }

            // Split the insight template in half so the data can go into the middle
            for (let i = 0; i < insightsList.length; i++ ) {
                const currentInsight1: string = String(insightsList[i]);

                const splitted = currentInsight1.split("[data]");

                finalInsights.push(splitted[0]);
                finalInsights.push(splitted[1]);
            }
            costsInsightsList = [finalInsights[0], finalInsights[1]];
            electricityInsightsList = [finalInsights[2], finalInsights[3]];
            gasInsightsList = [finalInsights[4], finalInsights[5]];
            emissionsInsightsList = [finalInsights[6], finalInsights[7]];
        }
        getAllInsights();

        const findSumOfConsumptionsBySiteIdAndTime = async () => {
          let costPct: String = "";
          let electricityPct: String = "";
          let gasPct: String = "";
          let emissionsPct: String = "";

          const now = new Date();
          const priorDate = new Date(new Date().setDate(now.getDate() - 7));
          const priorPriorDate = new Date(
            new Date().setDate(now.getDate() - 14)
          );

          const currentConsumptionsResponse =
            await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(
              priorDate,
              now,
              currentSiteId
            );
          const previousConsumptionsResponse =
            await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(
              priorPriorDate,
              priorDate,
              currentSiteId
            );

          const currentConsumptionsData = currentConsumptionsResponse["data"];
          const previousConsumptionsData = previousConsumptionsResponse["data"];

          const totalCurrentElectricityDemand = currentConsumptionsData[0];
          const totalCurrentGasDemand = currentConsumptionsData[1];
          const totalCurrentEmissions = currentConsumptionsData[2];
          const totalCurrentCosts = currentConsumptionsData[3];

          const totalPreviousElectricityDemand = previousConsumptionsData[0];
          const totalPreviousGasDemand = previousConsumptionsData[1];
          const totalPreviousEmissions = previousConsumptionsData[2];
          const totalPreviousCosts = previousConsumptionsData[3];

          // calculate percentage
          const electricityPercentage = Math.round(
            ((totalCurrentElectricityDemand - totalPreviousElectricityDemand) /
              totalPreviousElectricityDemand) *
              100
          );
          const gasPercentage = Math.round(
            ((totalCurrentGasDemand - totalPreviousGasDemand) /
              totalPreviousGasDemand) *
              100
          );
          const emissionsPercentage = Math.round(
            ((totalCurrentEmissions - totalPreviousEmissions) /
              totalPreviousEmissions) *
              100
          );
          const costPercentage = Math.round(
            ((totalCurrentCosts - totalPreviousCosts) / totalPreviousCosts) *
              100
          );

          // add plus or minus symbol and change colour
          if (electricityPercentage <= 0) {
            const stringElectricityPercentage = String(electricityPercentage);
            electricityPct = stringElectricityPercentage;
          } else {
            const stringElectricityPercentage = "+" + String(electricityPercentage);
            electricityPct = stringElectricityPercentage;
            setIsElectricityPositive(true);
          };

          if (gasPercentage <= 0) {
            const stringGasPercentage = String(gasPercentage);
            gasPct = stringGasPercentage;
          } else {
            const stringGasPercentage = "+" + String(gasPercentage);
            gasPct = stringGasPercentage;
            setIsGasPositive(true);
          };

          if (emissionsPercentage <= 0) {
            const stringEmissionsPercentage = String(emissionsPercentage);
            emissionsPct = stringEmissionsPercentage;
          } else {
            const stringEmissionsPercentage = "+" + String(emissionsPercentage);
            emissionsPct = stringEmissionsPercentage;
            setIsEmissionsPositive(true);
          };

          if (costPercentage <= 0) {
            const stringCostPercentage = String(costPercentage);
            costPct = stringCostPercentage;
          } else {
            const stringCostPercentage = "+" + String(costPercentage);
            costPct = stringCostPercentage;
            setIsCostPositive(true);
          };

          setCostsInsight({
            title: "Total Costs",
            insightList: costsInsightsList,
            percentage: costPct,
            isPositive: isCostPositive,
          });

          setElectricityInsight({
            title: "Electricity Insight",
            insightList: electricityInsightsList,
            percentage: electricityPct,
            isPositive: isElectricityPositive,
          });

          setGasInsight({
            title: "Gas Insight",
            insightList: gasInsightsList,
            percentage: gasPct,
            isPositive: isGasPositive,
          });

          setEmissionsInsight({
            title: "CO2 Emissions Insight",
            insightList: emissionsInsightsList,
            percentage: emissionsPct,
            isPositive: isEmissionsPositive,
          });
        }
        findSumOfConsumptionsBySiteIdAndTime();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
      <Container className="justify-content-end">
        <Col className="d-flex insightsCol">
          <Insight insightData={costsInsight} />

          <Insight insightData={electricityInsight} />

          <Insight insightData={gasInsight} />

          <Insight insightData={emissionsInsight} />
        </Col>
      </Container>
    );
};

export default DashboardInsights;