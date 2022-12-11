import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserManagementPage from "../../../../src/components/pages/admin/userManagement/UserManagementPage";

test("should render user management page title element", () => {
    // Given
    render(<UserManagementPage setTopbarTitle={jest.fn()} />);

    // When
    const userManagementPageElement = screen.getByTestId("userManagement");

    // Then
    expect(userManagementPageElement).toBeInTheDocument();
});
