import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignInForm from "../../../src/components/pages/signIn/SignIn";
import { BrowserRouter as Router } from "react-router-dom";

test("should render sign in form element", () => {
  // Given
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  // When
  const signInFormElement = screen.getByTestId("signInFormElement");

  // Then
  expect(signInFormElement).toBeInTheDocument();
});
