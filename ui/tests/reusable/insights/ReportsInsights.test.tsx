import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { addDays } from "date-fns";
import React from "react";
import ReportsInsights from "../../../src/components/reusable/insights/ReportsInsights";

const mockData = {
    dateRange: [
        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: "selection",
        },
    ],
};

test("should render reports insight", () => {
    // Given
    render(<ReportsInsights betweenDates={mockData}/>);
    // When
    const insightElement = screen.getByTestId("reportsInsights");
    // Then
    expect(insightElement).toBeInTheDocument();
});
