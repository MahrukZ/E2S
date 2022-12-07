import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../src/components/pages/Dashboard";

test("should render dashboard container", () => {
  // Given
  render(<Dashboard />);

  // When
  const dashboardElement = screen.getByTestId("dashboardContainer");

  // Then
  expect(dashboardElement).toBeInTheDocument();
});
