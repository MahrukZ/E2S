import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReportsGraphs from "../../../src/components/reusable/graphs/ReportsGraphs";
import "jest";
import "jest-canvas-mock";
import { addDays } from "date-fns";

const mockData = {
    dateRange: [        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: "selection",
        }],
};

test("should render the reports graph container", () => {
    // Given
    render(<ReportsGraphs betweenDates={mockData} />);

    // When
    const graphContainerElement = screen.getByTestId("graphContainer");

    // Then
    expect(graphContainerElement).toBeInTheDocument();
});
