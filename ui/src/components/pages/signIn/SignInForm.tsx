import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { UsersService} from "../../../services/users.service";
import Message from "../../reusable/alerts/Message";

function SignInForm() {

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [signInStatus, setsignInStatus] = useState("");

    const [authStatus, setAuthStatus] = useState("");

    const usersService = new UsersService;

    const signIn = async () => {
        const signInRes = await usersService.signIn(emailAddress, password);
        console.log("sign in res: ", signInRes);
        if (signInRes.auth == false) {
            setError("Wrong email/password combination");
        } else {
            setSuccess("Signed in");
        }
    }

    const checkAuth = async () => {
        const token: any = localStorage.getItem("token");
        console.log("token from local storage on form: ", token);
        if (token) {
            const authStatus = await usersService.checkAuth(token);
            if (authStatus) {
                setAuthStatus(authStatus);
            }
        }
    }

    useEffect(() => {
        const getSignIn = async () => {
          const signedIn = await usersService.checkSignIn();
          setsignInStatus("signed in: " + String(signedIn["loggedIn"]));
        }
        getSignIn();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <h1>{signInStatus}</h1>
                    {error.length > 0 && (
                        <Message message={error} type='danger' />
                    )}   
                    {success.length > 0 && (
                        <Message message={success} type='success' />
                    )}    
                    <h2>{authStatus}</h2>
                    <Button variant="primary"
                        onClick={checkAuth}
                    >
                        Check auth
                    </Button>            
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;