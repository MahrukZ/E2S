import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Graph from "../../../src/components/pages/dashboard/Graph";
import "jest";
import "jest-canvas-mock";

test("should render graph plot element", () => {
  // Given
  render(<Graph />);

  // When
  const graphElement = screen.getByTestId("electricityGraph");

  // Then
  expect(graphElement).toBeInTheDocument();
});
