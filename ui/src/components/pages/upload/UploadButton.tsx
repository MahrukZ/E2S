import { Button } from 'react-bootstrap';
import { FaUpload } from "react-icons/fa";

function UploadButton() {
  return (
    <Button variant="outline-primary"><FaUpload /> Upload Data</Button>
    );
};

export default UploadButton;