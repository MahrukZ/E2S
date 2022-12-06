import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserTable from "../../../../src/components/pages/admin/userManagement/UserTable";

test("should render user table element", () => {
  // Given
  render(<UserTable />);

  // When
  const userTableElement = document.getElementById("userTable");

  // Then
  expect(userTableElement).toBeInTheDocument();
});
