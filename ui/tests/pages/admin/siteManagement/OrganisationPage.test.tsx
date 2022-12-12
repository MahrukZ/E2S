import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OrganisationPage from "../../../../src/components/pages/admin/siteManagement/OrganisationPage";

test("should render organisation management page title element", () => {
    // Given
    render(<OrganisationPage setTopbarTitle={jest.fn()} />);

    // When
    const organisationPageElement = screen.getByTestId("orgContainer");

    // Then
    expect(organisationPageElement).toBeInTheDocument();
});
