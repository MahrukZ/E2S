import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { ConsumptionsService } from "../../../services/consumptions.service";

export interface IUploadData {
  time_interval: string,
  heat_demand: number,
  electricity_demand: number,
  electricity_price: number,
  gas_price: number,
  org_id: number,
  site_id: number
}

interface UploadButtonProps {
  file: any;
}

function UploadButton({ file }: UploadButtonProps) {
  const [csvData, setCsvData] = useState<IUploadData[]>([]);
  const [error, setError] = useState("");

  const consumptionsService = new ConsumptionsService();
  const fileReader = new FileReader();

  const csvFileToArray = (str:string) => {
    const csvHeader = str.slice(0, str.indexOf("\n")).split(",");
    const csvRows = str.slice(str.indexOf("\n") + 1).split("\n");
    
    const array:IUploadData[] = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object:any, header:string, index:number) => {
        if (header === "time_interval") {
          object[header] = values[index];
        } else if (header === "heat_demand" || header === "electricity_demand" || header === "electricity_price" || header === "gas_price") {
          object[header] = parseFloat(values[index]);
        }
        object['site_id'] = 1;
        object['org_id'] = 1;
        return object;
      }, {});
      return obj;
    });
    setCsvData(array);
    // console.log(array);
    consumptionsService.bulkCreateConsumptions(array);
  };

  const handleParse = (e:any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event:any) {
          const csvOutput = event.target.result;
          csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...csvData));

  return (
    <div className="container">
      <Button variant="outline-primary" onClick={handleParse}><FaUpload /> Upload Data</Button>
      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {csvData.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val:any) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>

    );
};

export default UploadButton;