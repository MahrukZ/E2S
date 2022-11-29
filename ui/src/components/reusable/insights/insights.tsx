import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { InsightsService } from "../../../services/insights.service";
import { SitesService } from "../../../services/sites.service";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
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

                let dataForTemplate: String[] = ["8", "-7.9", "12"];

                const currentData = String(dataForTemplate[i]);

                const insightToAdd1 = currentInsight1.replace("[data]", currentData);

                finalInsights.push(insightToAdd1);
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
    


  return (
      <Container className="justify-content-end">
            <div id="insights">
                    <h1>{insightsList[0]}</h1>
                    <h1>{insightsList[1]}</h1>
                    <h1>{insightsList[2]}</h1>
            </div>
      </Container>

  )
}

export default Insights