import { Form, Button } from 'react-bootstrap';
import { FaUpload } from "react-icons/fa"

function Upload() {
  return (
    <div className="container">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" accept=".csv" />
        </Form.Group>
        <Button variant="outline-primary"><FaUpload /> Upload Data</Button>{' '}
    </div>
  );
};

export default Upload;