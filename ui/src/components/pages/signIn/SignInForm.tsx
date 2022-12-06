import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../../../services/users.service";
import Message from "../../reusable/alerts/Message";

function SignInForm() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signInStatus, setsignInStatus] = useState("");

  const [authStatus, setAuthStatus] = useState("");

  const usersService = new UsersService();

  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      const signInRes = await usersService.checkSignIn();
      console.log(signInRes);
      if (signInRes["loggedIn"] == true) {
        setSuccess("Signed in");
        if (signInRes["user"].role != "administrator") {
          navigate("/");
        } else if (signInRes["user"].role == "administrator") {
          navigate("/admin/upload");
        }
      }
    };
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async () => {
    const signInRes = await usersService.signIn(emailAddress, password);
    if (signInRes.auth == false) {
      setError("Wrong email/password combination");
    } else {
      setSuccess("Signed in");
      window.location.reload();
    }
  };

  const checkAuth = async () => {
    const token: any = localStorage.getItem("token");
    if (token) {
      const authStatus = await usersService.checkAuth(token);
      if (authStatus) {
        setAuthStatus(authStatus);
      }
    }
  };

  useEffect(() => {
    const getSignIn = async () => {
      const signedIn = await usersService.checkSignIn();
      setsignInStatus("signed in: " + String(signedIn["loggedIn"]));
    };
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
                onChange={(e: any) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" onClick={signIn}>
              Sign In
            </Button>
          </Form>
          <h1>{signInStatus}</h1>
          {error.length > 0 && <Message message={error} type="danger" />}
          {success.length > 0 && <Message message={success} type="success" />}
          <h2>{authStatus}</h2>
          <Button variant="primary" onClick={checkAuth}>
            Check auth
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
