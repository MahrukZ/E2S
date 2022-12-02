import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { UsersService} from "../../../services/users.service";
import Message from "../../reusable/alerts/Message";

function SignInForm() {

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const usersService = new UsersService;

    const signIn = async () => {
        const user = await usersService.signIn(emailAddress, password);
        console.log("user: ", user);
        if (user["data"].length == 0) {
            console.log("user not found");
            setError("Wrong email/password combination");
        }; 
    }

    return (
        <Container>
            <Row>   
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="emailAddress">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e:any) => {
                                setEmailAddress(e.target.value);
                            }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                onChange={(e:any) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" 
                            onClick={signIn}
                            >
                            Sign In
                        </Button>
                    </Form>
                    {error.length > 0 && (
                        <Message message={error} type='danger' />
                    )}                   
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;