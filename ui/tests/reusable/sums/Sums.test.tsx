import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sums from "../../../src/components/reusable/sums/Sums";
import "jest";
import "jest-canvas-mock";
import { addDays } from "date-fns";

const mockData = {
    dateRange: [
        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: "selection",
        },
    ],
};

test("should render sums element", () => {
    // Given
    render(<Sums currentSite={1} betweenDates={mockData} />);

    // When
    const sumsElement = screen.getByTestId("sumsElement");

    // Then
    expect(sumsElement).toBeInTheDocument();
});
