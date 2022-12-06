import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Reports from "../../src/components/pages/Reports";

test("should render reports title element", () => {
  // Given
  render(<Reports />);

  // When
  const reportsElement = screen.getByText("Reports");

  // Then
  expect(reportsElement).toBeInTheDocument();
});
