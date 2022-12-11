import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../src/components/pages/Dashboard";

test("should render dashboard container", () => {
    // Given
    render(<Dashboard currentSite={1} setTopbarTitle={jest.fn()} />);

    // When
    const dashboardElement = screen.getByTestId("dashboardContainer");

    // Then
    expect(dashboardElement).toBeInTheDocument();
});
