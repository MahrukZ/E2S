import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SiteTable from "../../../../src/components/pages/admin/siteManagement/SiteTable";

test("should render site table element", () => {
    // Given
    render(<SiteTable />);

    // When
    const siteTableElement = document.getElementById("userTable");

    // Then
    expect(siteTableElement).toBeInTheDocument();
});
