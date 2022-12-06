import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BillValidation from "../../src/components/pages/BillValidation";

test("should render billvalidation title element", () => {
  // Given
  render(<BillValidation />);

  // When
  const billValidationElement = screen.getByText("BillValidation");

  // Then
  expect(billValidationElement).toBeInTheDocument();
});
