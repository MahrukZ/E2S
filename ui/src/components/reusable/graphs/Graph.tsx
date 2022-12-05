import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Card, Col } from "react-bootstrap";
import { ConsumptionsService } from "../../../services/consumptions.service";
import "./Graph.css";
import Plot from 'react-plotly.js';

function Graph() {

    const currentSiteId = 1;

    const [electricityDemandList, setElectricityDemandList] = useState<number[]>([]);
    const [gasDemandList, setGasDemandList] = useState<number[]>([]);
    const [emissionsList, setEmissionsList] = useState<number[]>([]);
    const [timeIntervalList, setTimeIntervalList] = useState<Date[]>([]);
    const [electricityCostList, setElectricityCostList] = useState<number[]>([]);
    const [gasCostList, setGasCostList] = useState<number[]>([]);
    
    const consumptionsService = new ConsumptionsService();

    useEffect(() => {
        const findAllConsumptionsBySiteIdAndTime = async () => {
            let electricityData = [];
            let gasData = [];
            let emissionsData = []
            let timeData = [];
            let electricityCostData = [];
            let gasCostData = [];

            const now = new Date();
            const priorDate = new Date(new Date().setDate(now.getDate() - 30));

            const currentConsumptionsResponse = await consumptionsService.findAllConsumptionsBySiteIdAndTime(priorDate, now, currentSiteId);

            const currentConsumptionsData = currentConsumptionsResponse["data"];

            for (let i = 0; i < currentConsumptionsData.length; i++) {
                const formattedElectricityDemand = parseFloat(currentConsumptionsData[i]["electricityDemand"]);
                electricityData.push(formattedElectricityDemand);

                const formattedGasDemand = parseFloat(currentConsumptionsData[i]["heatDemand"]);
                gasData.push(formattedGasDemand);

                const formattedEmissions = parseFloat(currentConsumptionsData[i]["co2Emissions"]);
                emissionsData.push(formattedEmissions);

                const formattedDate = new Date(currentConsumptionsData[i]["timeInterval"]);
                timeData.push(formattedDate);

                const electricityCost = parseFloat(currentConsumptionsData[i]["electricityDemand"]) * parseFloat(currentConsumptionsData[i]["electricityPrice"]);
                electricityCostData.push(electricityCost);

                const gasCost = parseFloat(currentConsumptionsData[i]["heatDemand"]) * parseFloat(currentConsumptionsData[i]["gasPrice"]);
                gasCostData.push(gasCost);
            }

            setGasDemandList(gasData);
            setElectricityDemandList(electricityData);
            setEmissionsList(emissionsData);
            setTimeIntervalList(timeData);
            setElectricityCostList(electricityCostData);
            setGasCostList(gasCostData);
        }

        findAllConsumptionsBySiteIdAndTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            color: '#0d609d'
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
                        title: 'Electricity Consumption (kWh)',
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
                            color: '#f15a2f'
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
                        title: 'Gas Consumption (kWh)',
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

        <Col className="d-flex graphContainer">
            <Card className="graphCard">
                <div className="graph">
                    <Plot
                        data={[
                            {
                                x: timeIntervalList,
                                y: emissionsList,
                                type: 'scatter',
                                line: {
                                    color: '#488f31'
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
                                    title: 'Carbon Emissions (kt)',
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

        <Col className="d-flex graphContainer">
        <Card className="largeGraphCard">
        <div className="graph" data-testid="electricityGraph">
            <Plot
                data={[
                    {
                        x: timeIntervalList,
                        y: electricityCostList,
                        type: 'scatter',
                        name: 'electricity',
                        line: {
                            color: '#0d609d'
                        }
                    },
                    {
                        x: timeIntervalList,
                        y: gasCostList,
                        type: 'scatter',
                        name: 'gas',
                        line: {
                            color: '#f15a2f'
                        }
                    }
                ]}
                layout={
                    {
                        width: 900,
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
                        title: 'Cost (£)',
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