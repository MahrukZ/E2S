import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../../../services/users.service";
import Message from "../../reusable/alerts/Message";
import "./SignInForm.css";
import logo from "./../../../assets/images/E2S_logo.png";

function SignInForm() {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const usersService = new UsersService();

    const navigate = useNavigate();

    useEffect(() => {
        const redirect = async () => {
            const signInRes = await usersService.checkSignIn();
            if (signInRes["loggedIn"] === true) {
                if (signInRes["user"].role !== "administrator") {
                    navigate("/");
                } else if (signInRes["user"].role === "administrator") {
                    navigate("/admin/user-management");
                }
            }
        };
        redirect();
        // reference. sign in on enter
        // taken from https://bobbyhadz.com/blog/react-detect-enter-key-press
        const keyDownHandler = (event: any) => {
            if (event.key === "Enter") {
                event.preventDefault();
                signIn();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
        // end of reference
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signIn = async () => {
        let valid: boolean = true;
        if (emailAddress.length > 44) {
            setError("Email address is too long");
            valid = false;
        }
        if (password.length > 25) {
            setError("Password is too long");
            valid = false;
        }
        if (valid) {
            const signInRes = await usersService.signIn(emailAddress, password);
            if (signInRes.auth === false) {
                setError("Wrong email/password combination");
            } else {
                window.location.reload();
            }
        }
    };

    return (
        <>
            <img
                width={150}
                height={150}
                src={logo}
                alt="e2s logo"
                className="e2sLogo mt-4"
            />
            <Container
                className="signInContainer mt-5"
                data-testid="signInFormElement"
            >
                <Row>
                    <Col>
                        <h1 className="signInTitle">
                            <span>
                                Sign In to E<sup>2</sup>S Dashboard
                            </span>
                        </h1>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="emailAddress"
                            >
                                <Form.Label className="signInFormLabel">
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e: any) => {
                                        setEmailAddress(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="signInFormLabel">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                    onChange={(e: any) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <div className="btnContainer">
                                <Button
                                    variant="primary"
                                    onClick={signIn}
                                    className="mb-3 signInBtn"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                        {error.length > 0 && (
                            <Message message={error} type="danger" />
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SignInForm;
