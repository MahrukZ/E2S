import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CostForecast from "../../src/components/pages/CostForecast";

test("should render costforecast container", () => {
    // Given
    render(<CostForecast currentSite={1} setTopbarTitle={jest.fn()} />);

    // When
    const costForecastElement = screen.getByTestId("costForecastContainer");

    // Then
    expect(costForecastElement).toBeInTheDocument();
});
