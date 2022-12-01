import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SignInForm() {

    return (
        <Container>
            <Row>   
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="emailAddress">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;