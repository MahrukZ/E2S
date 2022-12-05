import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { InsightsService } from "../../../services/insights.service";
import { SitesService } from "../../../services/sites.service";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { Container, Card, Col } from "react-bootstrap";
import "./Insights.css";

function Insights() {
  
    const currentSiteId = 1;

    const [insightsList, setInsightsList] = useState<String[]>([]);
    const [consumptionsList, setConsumptionsList] = useState<String[]>([]);

    // Sets the colour based on whether the change or positive or negative
    const [isElectricityPositive, setIsElectricityPositive] = useState(false);
    const [isGasPositive, setIsGasPositive] = useState(false);
    const [isCostPositive, setIsCostPositive] = useState(false);

    // Initialize services
    const insightsService = new InsightsService;
    const sitesService = new SitesService;
    const consumptionsService = new ConsumptionsService;

    useEffect(() => {
        // This will only work with 3 insight templates in the database
        const getAllInsights =async () => {
            let finalInsights: String[] = [];
            let insightsList: String[] = [];

            const insightsTemplates = await insightsService.getInsights();
            // Currently just has 1 as the siteId, this will need to be changed
            const siteData = await sitesService.findSiteByID(currentSiteId);

            const currentSite = siteData["data"][0]["name"];

            // Replace [site] in the template with site name
            for (let i = 0; i < insightsTemplates["data"].length; i++ ) {
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
            
            setInsightsList(finalInsights);

        }
        getAllInsights();

    }, []);
    
    useEffect(() => {
        const findSumOfConsumptionsBySiteIdAndTime =async () => {
            let finalConsumptions: String[] = [];
            let consumptionsList: String[] = [];

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 7));
            const priorPriorDate = new Date(new Date().setDate(now.getDate() - 14));

            const currentConsumptionsResponse = await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(priorDate, now, currentSiteId);
            const previousConsumptionsResponse = await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(priorPriorDate, priorDate, currentSiteId);
            
            const currentConsumptionsData = currentConsumptionsResponse["data"];
            const previousConsumptionsData = previousConsumptionsResponse["data"];

            const totalCurrentElectricityDemand = currentConsumptionsData[0];
            const totalCurrentGasDemand = currentConsumptionsData[1];
            const totalCurrentCosts = currentConsumptionsData[2];

            const totalPreviousElectricityDemand = previousConsumptionsData[0];
            const totalPreviousGasDemand = previousConsumptionsData[1];
            const totalPreviousCosts = previousConsumptionsData[2];

            // calculate percentage
            const electricityPercentage = Math.round(
                (totalCurrentElectricityDemand - totalPreviousElectricityDemand) / totalPreviousElectricityDemand * 100
            );
            const gasPercentage = Math.round(
                (totalCurrentGasDemand - totalPreviousGasDemand) / totalPreviousGasDemand * 100
            );
            const costPercentage = Math.round(
                (totalCurrentCosts - totalPreviousCosts) / totalPreviousCosts * 100
            );

            // add plus or minus symbol and change colour
            if (electricityPercentage < 0) {
                const stringElectricityPercentage = String(electricityPercentage);
                finalConsumptions.push(stringElectricityPercentage);
            }
            else {
                const stringElectricityPercentage = "+" + String(electricityPercentage);
                finalConsumptions.push(stringElectricityPercentage);
                setIsElectricityPositive(true);
            };

            if (gasPercentage < 0) {
                const stringGasPercentage = String(gasPercentage);
                finalConsumptions.push(stringGasPercentage);
            }
            else {
                const stringGasPercentage = "+" + String(gasPercentage);
                finalConsumptions.push(stringGasPercentage);
                setIsGasPositive(true);
            };

            if (costPercentage < 0) {
                const stringCostPercentage = String(costPercentage);
                finalConsumptions.push(stringCostPercentage);
            }
            else {
                const stringCostPercentage = "+" + String(costPercentage);
                finalConsumptions.push(stringCostPercentage);
                setIsCostPositive(true);
            };

            setConsumptionsList(finalConsumptions);
        }

        findSumOfConsumptionsBySiteIdAndTime();
    }, [])

  return (
      <Container className="justify-content-end">
            <Col className="d-flex insightsCol">

            <Card className="insightsCard flex-fill" data-testid="insightsCost">
                <Card.Title>Total Costs</Card.Title>
                <Card.Body>
                    {insightsList[0]} 
                    <b className="percentageNeutral" 
                    style={{
                        backgroundColor: isCostPositive ? 'darkred' : 'green',
                    }}>
                        {consumptionsList[2]}%
                    </b>
                    {insightsList[1]}
                </Card.Body>
            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Electricity Insight</Card.Title>
                <Card.Body>
                    {insightsList[2]} 
                    <b className="percentageNeutral" 
                    style={{
                        backgroundColor: isElectricityPositive ? 'darkred' : 'green',
                    }}>
                        {consumptionsList[0]}%
                    </b>
                    {insightsList[3]}
                </Card.Body>
            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Gas Insight</Card.Title>
                <Card.Body>
                    {insightsList[4]} 
                    <b className="percentageNeutral" 
                    style={{
                        backgroundColor: isGasPositive ? 'darkred' : 'green',
                    }}>
                        {consumptionsList[1]}%
                    </b>
                    {insightsList[5]}
                </Card.Body>
            </Card>
            </Col>
      </Container>

  )
}

export default Insights