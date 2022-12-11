import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./Graph.css";
import Plot from "react-plotly.js";
import ReactLoading from "react-loading";

export interface ISingleGraph {
  xData: Date[];
  yData: number[];
  xName: string;
  yName: string;
  lineColour: string;
  width?: string;
}

interface SingleGraphProps {
  graphData: ISingleGraph;
  isLoading?: Boolean;
}

function SingleGraph({ graphData, isLoading }: SingleGraphProps) {
  return (
    <Card className="graphCard flex-fill" style={{ width: graphData.width }}>
      {isLoading ? (
        <ReactLoading
          className="loaderAlignment"
          type="spin"
          color="#73a6ba"
          height={"20%"}
          width={"20%"}
        />
      ) : (
        <div className="graph" data-testid="graphElement">
          <Plot
            data={[
              {
                x: graphData.xData,
                y: graphData.yData,
                type: "scatter",
                line: {
                  color: graphData.lineColour,
                },
              },
            ]}
            useResizeHandler
            style={{
              width: "100%",
              height: "100%",
            }}
            layout={{
              autosize: true,
              xaxis: {
                autorange: true,
                rangeselector: {
                  buttons: [
                    {
                      count: 1,
                      label: "Day",
                      step: "day",
                      stepmode: "backward",
                    },
                    {
                      count: 6,
                      label: "Week",
                      step: "day",
                      stepmode: "backward",
                    },
                    {
                      label: "Month",
                      step: "all",
                    },
                  ],
                },
                rangeslider: {
                  range: [graphData.xData[0], graphData.xData[-1]],
                },
                type: "date",
              },
              yaxis: {
                title: graphData.yName,
                titlefont: {
                  size: 16,
                },
                autorange: true,
                range: [86.8700008333, 138.870004167],
                type: "linear",
              },
              margin: {
                b: 20,
                t: 50,
                r: 20,
                l: 70,
              },
            }}
          />
        </div>
      )}
    </Card>
  );
}

export default SingleGraph;
