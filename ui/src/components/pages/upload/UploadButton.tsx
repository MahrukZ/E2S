import { useState } from "react";
import { Button } from 'react-bootstrap';
import { FaUpload } from "react-icons/fa";

interface UploadButtonProps {
  file: any;
}

function UploadButton({ file }: UploadButtonProps) {

  const [csvData, setCsvData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fileReader = new FileReader();

  const csvFileToArray = (string:string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array:any[] = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object:any, header:string, index:number) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(array);
    setCsvData(array);
  };

  const handleParse = (e:any) => {
    console.log("handling parse");
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