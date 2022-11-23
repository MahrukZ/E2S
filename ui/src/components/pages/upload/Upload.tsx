import React from 'react'
import { Form } from 'react-bootstrap';

function Upload() {
  return (
    <div className="container">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Some Data</Form.Label>
            <Form.Control type="file" />
        </Form.Group>
    </div>
  );
};

export default Upload;