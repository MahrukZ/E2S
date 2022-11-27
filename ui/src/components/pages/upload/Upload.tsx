import { useState } from "react";
import { Form } from 'react-bootstrap';
import Message from "../../reusable/alerts/Message";
import UploadButton from './UploadButton';

function Upload() {
  const [csvFile, setCsvFile] = useState();
  const [error, setError] = useState("");

  const allowedExtensions = ["csv"];

  // Adapted from https://www.geeksforgeeks.org/how-to-read-csv-files-in-react-js/ 
  const handleFileChange = (e:any) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!allowedExtensions.includes(fileExtension)) {
          setError("Please input a csv file");
          return;
      } else {
        setError("");
        setCsvFile(inputFile);
      }
    };
  };
  // End of reference

  return (
    <div className="container">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <UploadButton file={csvFile}/>
        {error.length > 0 && (
          <Message message={error} type='danger'/>
        )}
    </div>
  );
}

export default Upload;