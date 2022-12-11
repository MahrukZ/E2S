import ForecastGraph from "../reusable/graphs/ForecastGraph";
import { useEffect } from "react";

interface CostForecastProps {
    currentSite: any;
    setTopbarTitle: any;
}

function CostForecast({ currentSite, setTopbarTitle }: CostForecastProps) {
    useEffect(() => {
        setTopbarTitle("Cost Forecast");
        document.title = "Cost Forecast";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div data-testid="costForecastContainer">
            <ForecastGraph currentSite={currentSite}></ForecastGraph>
        </div>
    );
}

export default CostForecast;
