import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import OverviewPage from "../../../../src/components/pages/admin/overview/OverviewPage";

test("should render overview container", () => {
    // Given
    render(<OverviewPage setTopbarTitle={jest.fn()} />);

    // When
    const overviewPageElement = document.getElementById("overviewContainer");

    // Then
    expect(overviewPageElement).toBeInTheDocument();
});
