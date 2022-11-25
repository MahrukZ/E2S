import { useState } from "react";
import { Button } from 'react-bootstrap';
import { FaUpload } from "react-icons/fa";

interface UploadButtonProps {
  file: any;
}

function UploadButton({ file }: UploadButtonProps) {

  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState("");

  const fileReader = new FileReader();

  const handleParse = (e:any) => {
    console.log("handling parse");
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event:any) {
          const csvOutput = event.target.result;
          console.log(csvOutput);
      };
      fileReader.readAsText(file);
    }

  };

  return (
    <Button variant="outline-primary" onClick={handleParse}><FaUpload /> Upload Data</Button>
    );
};

export default UploadButton;