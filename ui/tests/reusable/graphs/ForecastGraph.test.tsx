import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ForecastGraph from "../../../src/components/reusable/graphs/ForecastGraph";
import "jest";
import "jest-canvas-mock";

test("should render the graph container", () => {
    // Given
    render(<ForecastGraph currentSite={1} />);

    // When
    const graphContainerElement = screen.getByTestId("graphContainer");

    // Then
    expect(graphContainerElement).toBeInTheDocument();
});
