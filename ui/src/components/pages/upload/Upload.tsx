import { useState } from "react";
import { Form } from 'react-bootstrap';
import UploadButton from './UploadButton';

function Upload() {

  const [csvFile, setCsvFile] = useState();
  const [error, setError] = useState("");

  const allowedExtensions = ["csv"];

  const handleFileChange = (e:any) => {
    setError("");
     
    // Check if user has entered the file
    if (e.target.files.length) {
        const inputFile = e.target.files[0];
         
        // Check the file extensions, if it not
        // included in the allowed extensions
        // we show the error
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a csv file");
            return;
        }

        // If input type is correct set the state
        setCsvFile(inputFile);
    }
  };

  return (
    <div className="container">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <UploadButton file={csvFile}/>
    </div>
  );
}

export default Upload;