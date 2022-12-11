import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import BillValidation from "../../src/components/pages/BillValidation";

test("should render billvalidation title element", () => {
    // Given
    render(<BillValidation currentSite={1} setTopbarTitle={jest.fn()} />);

    // When
    const billValidationElement = screen.getByTestId("BillValidation");

    // Then
    expect(billValidationElement).toBeInTheDocument();
});
