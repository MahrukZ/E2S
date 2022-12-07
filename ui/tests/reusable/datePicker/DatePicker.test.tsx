import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DatePicker from "../../../src/components/reusable/datePicker/DatePicker";
import "jest";
import "jest-canvas-mock";

test("should render date picker element", () => {
    // Given
    render(<DatePicker />);

    // When
    const datePickerElement = screen.getByTestId("datePickerElement");

    // Then
    expect(datePickerElement).toBeInTheDocument();
});
