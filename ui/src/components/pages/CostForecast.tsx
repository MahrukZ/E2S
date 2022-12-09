import ForecastGraph from "../reusable/graphs/ForecastGraph";

interface CostForecastProps {
    currentSite: any;
}

function CostForecast({ currentSite }: CostForecastProps) {
    return (
        <div data-testid="costForecastContainer">
            <ForecastGraph currentSite={currentSite}></ForecastGraph>
        </div>
    );
}

export default CostForecast;
