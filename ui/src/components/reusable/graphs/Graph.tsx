import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Card, Col } from "react-bootstrap";
import { SitesService } from "../../../services/sites.service";
import { ConsumptionsService } from "../../../services/consumptions.service";
import "./Graph.css";
import Plot from 'react-plotly.js';

function Graph() {

    const currentSiteId = 1;

    const [electricityDemandList, setElectricityDemandList] = useState<number[]>([]);
    const [gasDemandList, setGasDemandList] = useState<number[]>([]);
    const [timeIntervalList, setTimeIntervalList] = useState<Date[]>([]);
    

    const sitesService = new SitesService;
    const consumptionsService = new ConsumptionsService;

    useEffect(() => {
        const findAllConsumptionsBySiteAndTime = async () => {
            let electricityData = [];
            let gasData = [];
            let timeData = [];

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 30));

            const currentConsumptionsResponse = await consumptionsService.findAllConsumptionsBySiteAndTime(priorDate, now, currentSiteId);

            const currentConsumptionsData = currentConsumptionsResponse["data"];

            for (let i = 0; i < currentConsumptionsData.length; i++) {
                const formattedElectricityDemand = parseFloat(currentConsumptionsData[i]["electricityDemand"]);

                electricityData.push(formattedElectricityDemand);

                const formattedGasDemand = parseFloat(currentConsumptionsData[i]["heatDemand"]);

                gasData.push(formattedGasDemand);

                const formattedDate = new Date(currentConsumptionsData[i]["timeInterval"]);

                timeData.push(formattedDate);
            }

            setGasDemandList(gasData);
            setElectricityDemandList(electricityData);
            setTimeIntervalList(timeData);
        }

        findAllConsumptionsBySiteAndTime();
    }, []);

    return (
        <Container className="justify-content-end">
            <Col className="d-flex graphContainer">
        <Card className="graphCard">
        <div className="graph" data-testid="electricityGraph">
            <Plot
                data={[
                    {
                        x: timeIntervalList,
                        y: electricityDemandList,
                        type: 'scatter',
                        line: {
                            color: ['#7F7F7F']
                        }
                    },
                ]}
                layout={
                    {
                        width: 400,
                        height: 450,
                    xaxis: {
                        autorange: true,
                        range: ['2015-02-17', '2017-02-16'],
                        rangeselector: {buttons: [
                            {
                              count: 1,
                              label: 'Day',
                              step: 'day',
                              stepmode: 'backward'
                            },
                            {
                              count: 6,
                              label: 'Week',
                              step: 'day',
                              stepmode: 'backward'
                            },
                            {
                                label: 'Month',
                                step: 'all'
                            }
                          ]},
                        rangeslider: {range: [timeIntervalList[0], timeIntervalList[-1]]},
                        type: 'date'
                      },
                      yaxis: {
                        title: 'Electricity Consumption (KWh)',
                                titlefont: {
                                    size: 16
                                },
                        autorange: true,
                        range: [86.8700008333, 138.870004167],
                        type: 'linear'
                      },
                        margin: {
                            b: 20,
                            t: 50,
                            r: 0,
                            l: 70
                        }
                    }
                }
            />
        </div>
        </Card>
        <Card className="graphCard">
        <div className="graph" data-testid="electricityGraph">
            <Plot
                data={[
                    {
                        x: timeIntervalList,
                        y: gasDemandList,
                        type: 'scatter',
                        line: {
                            color: ['#7F7F7F']
                        }
                    },
                ]}
                layout={
                    {
                        width: 400,
                        height: 450,
                    xaxis: {
                        autorange: true,
                        range: ['2015-02-17', '2017-02-16'],
                        rangeselector: {buttons: [
                            {
                              count: 1,
                              label: 'Day',
                              step: 'day',
                              stepmode: 'backward'
                            },
                            {
                              count: 6,
                              label: 'Week',
                              step: 'day',
                              stepmode: 'backward'
                            },
                            {
                                label: 'Month',
                                step: 'all'
                            }
                          ]},
                        rangeslider: {range: [timeIntervalList[0], timeIntervalList[-1]]},
                        type: 'date'
                      },
                      yaxis: {
                        title: 'Gas Consumption (KWh)',
                                titlefont: {
                                    size: 16
                                },
                        autorange: true,
                        range: [86.8700008333, 138.870004167],
                        type: 'linear'
                      },
                      margin: {
                        b: 20,
                        t: 50,
                        r: 0,
                        l: 70
                    }
                    }
                }
            />
        </div>
        </Card>
        </Col>
        </Container>
        
    )
}

export default Graph;