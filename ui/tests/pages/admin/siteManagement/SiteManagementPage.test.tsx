import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SiteManagementPage from "../../../../src/components/pages/admin/siteManagement/SiteManagementPage";

test("should render site management page title element", () => {
    // Given
    render(<SiteManagementPage setTopbarTitle={jest.fn()} />);

    // When
    const siteManagementPageElement = screen.getByTestId("siteManagement");

    // Then
    expect(siteManagementPageElement).toBeInTheDocument();
});
