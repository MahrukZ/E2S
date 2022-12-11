import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddUser from "../../../../src/components/pages/admin/userManagement/AddUser";

const mockUsersList = {
    list: []
}

test("should render 'add user' button element", () => {
    // Given
    render(<AddUser setUsersList={mockUsersList} />);

    // When
    const addUserBtnElement = document.getElementById("addUserBtn");

    // Then
    expect(addUserBtnElement).toBeInTheDocument();
});
