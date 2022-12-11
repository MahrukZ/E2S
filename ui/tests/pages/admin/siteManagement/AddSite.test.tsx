import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddSite from "../../../../src/components/pages/admin/siteManagement/AddSite";

const mockSitesList = {
    list: [],
};

test("should render 'add user' button element", () => {
    // Given
    render(<AddSite setSitesList={mockSitesList} />);

    // When
    const addSiteBtnElement = document.getElementById("addUserBtn");

    // Then
    expect(addSiteBtnElement).toBeInTheDocument();
});
