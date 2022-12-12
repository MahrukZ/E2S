import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserManagementCard from "../../../../src/components/pages/admin/overview/UserManagementCard";

test("should render user management column", () => {
    // Given
    render(<UserManagementCard />);

    // When
    const userManagementColElement =
        document.getElementById("userManagementCol");

    // Then
    expect(userManagementColElement).toBeInTheDocument();
});
