import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { ConsumptionsService } from "../../../services/consumptions.service";
import Message from "../../reusable/alerts/Message";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const consumptionsService = new ConsumptionsService();
  const fileReader = new FileReader();

  // Adapted from https://dev.to/refine/how-to-import-csv-file-with-react-4pj2
  const csvFileToArray = (str:string) => {
    const csvHeader = str.slice(0, str.indexOf("\n")).split(",");
    const csvRows = str.slice(str.indexOf("\n") + 1).split("\n");
    
    try {
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
      
      consumptionsService.bulkCreateConsumptions(array);
      setSuccess("Successfully uploaded data!")
    } catch (e) {
      setError("Failed to upload data.")
    }
  };

  const handleUpload = (e:any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event:any) {
          const csvOutput = event.target.result;
          csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  // End of reference

  return (
    <div className="container">
      <Button variant="outline-primary" onClick={handleUpload}>
        <FaUpload /> Upload Data
      </Button>
      {error.length > 0 && (
          <Message message={error} type='danger'/>
      )}
      {success.length > 0 && (
          <Message message={success} type='success'/>
      )}
    </div>
    );
};

export default UploadButton;