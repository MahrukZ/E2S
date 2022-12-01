import SignInForm from "./SignInForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";

function SignIn() {
  return (
    <div>
        <h1 id="signInTitle">Sign In</h1>
        <SignInForm />
    </div>
  );
};

export default SignIn;