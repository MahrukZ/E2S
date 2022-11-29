import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { InsightsService } from "../../../services/insights.service";
import { SitesService } from "../../../services/sites.service";
import { Container, Card, Col } from "react-bootstrap";
import "./insights.css";

function Insights() {
  
    const [insightsList, setInsightsList] = useState<String[]>([]);

    const insightsService = new InsightsService;
    const sitesService = new SitesService;

    useEffect(() => {
        // This will only work with 3 insight templates in the database
        const getAllInsights =async () => {
            let finalInsights: String[] = [];
            let insightsList: String[] = [];

            const insightsTemplates = await insightsService.getInsights();
            // Currently just has 1 as the siteId, this will need to be changed
            const siteData = await sitesService.findSiteBySiteID(1);

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

        // Placeholder before consumptions service/backend implemented
        // const getConsumptions =async () => {
        //   const consumptionData = await consumptionsService.findConsumptionsBySite(3);
        // }
        // getConsumptions();

      }, []);
    
      // Consumptions data code

      // Get consumptions data of last 60 days from database
      // Calculate total costs (Gas x Gas Price & Electricity x Electricity Price)
      // Split into Electricity Consumption, Gas Consumption, Total Costs
      // Calculate the sum of consumptions/costs for the first 30 days and the last 30 days
      // Compare to get a percentage increase/decrease

      let placeholderData: String[] = ["+8%", "-14.5%", "+13%"];

  return (
      <Container className="justify-content-end">
            <Col className="d-flex insightsCol">

            <Card className="insightsCard flex-fill">
                <Card.Title>Total Costs</Card.Title>
                <Card.Body>
                    {insightsList[0]} 
                    <b className="percentageBad">
                    {placeholderData[0]}
                    </b>
                    {insightsList[1]}
                </Card.Body>

            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Electricity Insight</Card.Title>
                <Card.Body>
                    {insightsList[2]} 
                    <b className="percentageGood">
                    {placeholderData[1]}
                    </b>
                    {insightsList[3]}
                </Card.Body>
            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Gas Insight</Card.Title>
                <Card.Body>
                    {insightsList[4]} 
                    <b className="percentageBad">
                    {placeholderData[2]}
                    </b>
                    {insightsList[5]}
                </Card.Body>
            </Card>

            </Col>
      </Container>

  )
}

export default Insights