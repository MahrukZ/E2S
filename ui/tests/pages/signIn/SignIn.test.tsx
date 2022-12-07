import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignIn from "../../../src/components/pages/signIn/SignIn";
import { BrowserRouter as Router } from "react-router-dom";

test("should render sign in form div element", () => {
  // Given
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // When
  const signInElement = screen.getByTestId("signInForm");

  // Then
  expect(signInElement).toBeInTheDocument();
});
