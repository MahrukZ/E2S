import { useState } from "react";
import { Form } from "react-bootstrap";
import Message from "../../../reusable/alerts/Message";
import UploadButton from "./UploadButton";

interface UploadProps {
    siteId: number;
}

function Upload({ siteId }: UploadProps) {
    const [csvFile, setCsvFile] = useState();
    const [fileExt, setFileExt] = useState("");
    const [error, setError] = useState("");

    const allowedExtensions = ["csv"];

    // Adapted from https://www.geeksforgeeks.org/how-to-read-csv-files-in-react-js/
    const handleFileChange = (e: any) => {
        setError("");

        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const fileExtension = inputFile?.type.split("/")[1];
            setFileExt(fileExtension);

            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            } else {
                setError("");
                setCsvFile(inputFile);
            }
        }
    };
    // End of reference

    return (
        <div className="container">
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a CSV file</Form.Label>
                <Form.Control
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
            </Form.Group>
            {allowedExtensions.includes(fileExt) && (
                <UploadButton file={csvFile} selectedId={siteId} />
            )}
            {error.length > 0 && <Message message={error} type="danger" />}
        </div>
    );
}

export default Upload;
