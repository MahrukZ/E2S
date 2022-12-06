import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import AccountDropdown from "../../../src/components/reusable/topbar/AccountDropdown";
import { IUser } from "../../../src/components/reusable/topbar/Topbar";

test("should render account dropdown element with user props", () => {
  // Given
  const testUser: IUser = {
    userId: 1,
    name: "Test Name",
  };
  render(<AccountDropdown user={testUser} />);

  // When
  const dropDownElement = screen.getByTestId("dropdownButton");
  const accountElement = screen.getByTestId("accountName");

  // Then
  expect(dropDownElement).toBeInTheDocument();
  expect(accountElement).toHaveTextContent("Test Name");
});
