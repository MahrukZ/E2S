import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserManagementPage from "../../../../src/components/pages/admin/userManagement/UserManagementPage";

test("should render user management page title element", () => {
  // Given
  render(<UserManagementPage />);

  // When
  const userManagementPageElement = screen.getByText("User Management");

  // Then
  expect(userManagementPageElement).toBeInTheDocument();
});
