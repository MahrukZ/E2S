import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import EditUser from "../../../../src/components/pages/admin/userManagement/EditUser";

const mockEmail = "test@test.com"
const mockUsersList = {
    list: [],
};

test("should render edit button element", () => {
    // Given
    render(<EditUser userEmail={mockEmail} setUsersList={mockUsersList} />);

    // When
    const editUserBtnElement = document.getElementById("editUserBtn");

    // Then
    expect(editUserBtnElement).toBeInTheDocument();
});
