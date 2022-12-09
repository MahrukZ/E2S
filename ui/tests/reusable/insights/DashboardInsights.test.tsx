import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import DashboardInsights from "../../../src/components/reusable/insights/DashboardInsights";

test("should render dashboard insight", () => {
    // Given
    render(<DashboardInsights />);
    // When
    const insightElement = screen.getByTestId("dashboardInsights");
    // Then
    expect(insightElement).toBeInTheDocument();
});
