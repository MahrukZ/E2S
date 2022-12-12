import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import EditSite from "../../../../src/components/pages/admin/siteManagement/EditSite";

const mockId = 1;
const mockSiteList = {
    list: [],
};

test("should render edit button element", () => {
    // Given
    render(<EditSite siteId={mockId} setSitesList={mockSiteList} />);

    // When
    const editSiteBtnElement = document.getElementById("editSiteBtn");

    // Then
    expect(editSiteBtnElement).toBeInTheDocument();
});
