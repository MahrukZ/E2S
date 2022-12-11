import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReportsDatePicker from "../../../src/components/reusable/datePicker/ReportsDatePicker";
import "jest";
import "jest-canvas-mock";

test("should render reports date picker element", () => {
    // Given
    render(<ReportsDatePicker currentSite={1} />);

    // When
    const reportsDatePickerElement = screen.getByTestId(
        "reportsDatePickerElement"
    );

    // Then
    expect(reportsDatePickerElement).toBeInTheDocument();
});
