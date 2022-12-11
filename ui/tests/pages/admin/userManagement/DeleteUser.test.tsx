import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DeleteUser from "../../../../src/components/pages/admin/userManagement/DeleteUser";

const mockUsersList = {
    list: [],
};

test("should render delete button element", () => {
    // Given
    render(<DeleteUser id={1} setUsersList={mockUsersList} />);

    // When
    const deleteUserBtnElement = document.getElementById("deleteUserBtn");

    // Then
    expect(deleteUserBtnElement).toBeInTheDocument();
});
