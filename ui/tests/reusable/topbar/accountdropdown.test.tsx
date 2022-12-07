import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import AccountDropdown from "../../../src/components/reusable/topbar/AccountDropdown";
import { IUser } from "../../../src/components/reusable/topbar/Topbar";
import { BrowserRouter as Router } from "react-router-dom";

test("should render account dropdown element with user props", () => {
  // Given
  const testUser: IUser = {
    userId: 1,
    name: "Test Name",
  };
  render(
    <Router>
      <AccountDropdown user={testUser} />
    </Router>
  );

  // When
  const dropDownElement = screen.getByTestId("dropdownButton");
  const accountElement = screen.getByTestId("accountName");

  // Then
  expect(dropDownElement).toBeInTheDocument();
  expect(accountElement).toHaveTextContent("Test Name");
});
