import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DeleteSite from "../../../../src/components/pages/admin/siteManagement/DeleteSite";

const mockSiteList = {
    list: [],
};

test("should render delete button element", () => {
    // Given
    render(<DeleteSite id={1} setSitesList={mockSiteList} />);

    // When
    const deleteSiteBtnElement = document.getElementById("deleteSiteBtn");

    // Then
    expect(deleteSiteBtnElement).toBeInTheDocument();
});
