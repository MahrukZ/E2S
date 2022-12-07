import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ISums } from "./../datePicker/DatePicker";
import "../datePicker/DatePicker.css";
import { ConsumptionsService } from "../../../services/consumptions.service";
import { SitesService } from "../../../services/sites.service";

interface ISumsProps {
    betweenDates: ISums;
}

function Sums({ betweenDates }: ISumsProps) {
    const currentSiteId = 1;

    const [consumptionsList, setConsumptionsList] = useState<String[]>([]);
    const [siteName, setSiteName] = useState<String>();
    const [dateRange, setDateRange] = useState<String[]>([]);

    const consumptionsService = new ConsumptionsService();
    const sitesService = new SitesService();

    console.log(betweenDates);

    useEffect(() => {
        const findSumOfConsumptionsBySiteIdAndTime = async () => {
            let finalConsumptions: String[] = [];

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 7));

            const siteData = await sitesService.findSiteById(currentSiteId);

            const currentSite = siteData["data"][0]["name"];

            const consumptionsResponse =
                await consumptionsService.findSumOfConsumptionsBySiteIdAndTime(
                    priorDate,
                    now,
                    currentSiteId
                );

            const consumptionsData = consumptionsResponse["data"];

            const stringElectricityDemand = Math.round(
                consumptionsData[0]
            ).toLocaleString();

            const stringGasDemand = Math.round(
                consumptionsData[1]
            ).toLocaleString();
            const stringEmissions = Math.round(
                consumptionsData[2]
            ).toLocaleString();
            const stringTotalCosts = Math.round(
                consumptionsData[3]
            ).toLocaleString();
            const stringElectricityCosts = Math.round(
                consumptionsData[4]
            ).toLocaleString();
            const stringGasCosts = Math.round(
                consumptionsData[5]
            ).toLocaleString();

            const priorMonth = priorDate.getMonth() + 1;
            const nowMonth = now.getMonth() + 1;

            const from =
                priorDate.getDate() +
                "-" +
                priorMonth +
                "-" +
                priorDate.getFullYear();
            const to = now.getDate() + "-" + nowMonth + "-" + now.getFullYear();

            finalConsumptions.push(
                stringElectricityDemand,
                stringGasDemand,
                stringEmissions,
                stringTotalCosts,
                stringElectricityCosts,
                stringGasCosts
            );

            setDateRange([from, to]);
            setConsumptionsList(finalConsumptions);
            setSiteName(currentSite);
        };
        findSumOfConsumptionsBySiteIdAndTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(betweenDates);
    return (
        <Card className="flex-fill datePickerCard">
            <Card.Title>
                {siteName} between {dateRange[0]} and {dateRange[1]}
            </Card.Title>
            <Card.Body>
                <li>Electricity Demand: {consumptionsList[0]} kWh</li>
                <li>Gas Demand: {consumptionsList[1]} kWh</li>
                <li>Carbon Emissions: {consumptionsList[2]} UNIT</li>
                <li>Electricity Costs: £ {consumptionsList[4]}</li>
                <li>Gas Costs: £ {consumptionsList[5]}</li>
                <li>Total Costs: £ {consumptionsList[3]}</li>
            </Card.Body>
        </Card>
    );
}

export default Sums;
