import SignInForm from "./SignInForm";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";

function SignIn() {
    useEffect(() => {
        document.title = "Sign In";
    }, []);
    return (
        <div data-testid="signInForm">
            <SignInForm />
        </div>
    );
}

export default SignIn;
