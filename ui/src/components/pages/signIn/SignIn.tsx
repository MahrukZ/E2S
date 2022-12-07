import SignInForm from "./SignInForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";

function SignIn() {
  return (
    <div data-testid="signInForm">
      <SignInForm />
    </div>
  );
}

export default SignIn;
