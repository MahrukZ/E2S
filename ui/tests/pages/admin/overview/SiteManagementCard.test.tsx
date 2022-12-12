import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SiteManagementCard from "../../../../src/components/pages/admin/overview/SiteManagementCard";

test("should render site management column", () => {
    // Given
    render(<SiteManagementCard />);

    // When
    const siteManagementColElement =
        document.getElementById("siteManagementCol");

    // Then
    expect(siteManagementColElement).toBeInTheDocument();
});
