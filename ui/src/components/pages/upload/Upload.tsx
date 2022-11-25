import { Form } from 'react-bootstrap';
import UploadButton from './UploadButton';

function Upload() {
  return (
    <div className="container">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" accept=".csv" />
        </Form.Group>
        <UploadButton />
    </div>
  );
};

export default Upload;