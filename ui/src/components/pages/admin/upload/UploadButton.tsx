import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { ConsumptionsService } from "../../../../services/consumptions.service";
import Message from "../../../reusable/alerts/Message";

export interface IUploadData {
  consumptionId?: number;
  timeInterval: string;
  heatDemand: number;
  electricityDemand: number;
  electricityPrice: number;
  gasPrice: number;
  orgId: number;
  siteId: number;
}

interface UploadButtonProps {
  file: any;
}

function UploadButton({ file }: UploadButtonProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const consumptionsService = new ConsumptionsService();
  const fileReader = new FileReader();

  // Adapted from https://dev.to/refine/how-to-import-csv-file-with-react-4pj2
  const csvFileToArray = (str: string) => {
    const csvHeader = str.slice(0, str.indexOf("\n")).split(",");
    const csvRows = str.slice(str.indexOf("\n") + 1).split("\n");

    try {
      const array: IUploadData[] = csvRows.map((i) => {
        const values = i.split(",");
        const obj = csvHeader.reduce(
          (object: any, header: string, index: number) => {
            if (header === "timeInterval") {
              object[header] = values[index];
            } else if (
              header === "heatDemand" ||
              header === "electricityDemand" ||
              header === "electricityPrice" ||
              header === "gasPrice"
            ) {
              object[header] = parseFloat(values[index]);
            }
            object["siteId"] = 1;
            object["orgId"] = 1;
            return object;
          },
          {}
        );
        return obj;
      });

      if (array[0].timeInterval && array[0].orgId && array[0].siteId) {
        consumptionsService.bulkCreateConsumptions(array);
        setError("");
        setSuccess("Successfully uploaded data!");
        setDisabled(true);
      } else {
        setSuccess("");
        setError(
          "The format of your CSV file is incorrect! Unable to upload data."
        );
      }
    } catch (e) {
      setSuccess("");
      setError("Failed to upload data.");
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  // End of reference

  return (
    <>
      <Button
        data-testid="uploadBtn"
        variant="outline-primary"
        disabled={isDisabled}
        onClick={handleUpload}
      >
        <FaUpload /> Upload Data
      </Button>
      {error.length > 0 && <Message message={error} type="danger" />}
      {success.length > 0 && <Message message={success} type="success" />}
    </>
  );
}

export default UploadButton;
