import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddSite from "../../../../src/components/pages/admin/siteManagement/AddSite";

const mockSitesList = {
    list: [],
};

test("should render 'add site' button element", () => {
    // Given
    render(<AddSite setSitesList={mockSitesList} />);

    // When
    const addSiteBtnElement = document.getElementById("addSiteBtn");

    // Then
    expect(addSiteBtnElement).toBeInTheDocument();
});
