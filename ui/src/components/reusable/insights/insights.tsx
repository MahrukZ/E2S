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

        const getAllInsights =async () => {
            let finalInsights: String[] = [];
            let insightsList: String[] = [];

            const insightsTemplates = await insightsService.getInsights();
            const siteData = await sitesService.findSiteBySiteID(1);

            const currentSite = siteData["data"][0]["name"];

            for (let i = 0; i < insightsTemplates["data"].length; i++ ) {
                const currentInsight0: string = String(insightsTemplates["data"][i]["description"]);

                const insightToAdd0 = currentInsight0.replace("[site]", currentSite)

                insightsList.push(insightToAdd0);
            }

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
    
      let placeholderData: String[] = ["+8", "-14.5", "+13"];

  return (
      <Container className="justify-content-end">
            <Col className="d-flex insightsCol">

            <Card className="insightsCard flex-fill">
                <Card.Title>Total Costs</Card.Title>
                <Card.Text>{insightsList[0]} 
                    {placeholderData[0]}
                    {insightsList[1]}
                </Card.Text>

            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Electricity Insight</Card.Title>
                <Card.Text>
                    {insightsList[2]} 
                    {placeholderData[1]}
                    {insightsList[3]}
                </Card.Text>
            </Card>

            <Card className="insightsCard flex-fill">
            <Card.Title>Gas Insight</Card.Title>
                <Card.Text>
                    {insightsList[4]} 
                    {placeholderData[2]}
                    {insightsList[5]}
                </Card.Text>
            </Card>

            </Col>
      </Container>

  )
}

export default Insights