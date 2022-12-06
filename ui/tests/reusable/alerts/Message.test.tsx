import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../../../src/components/reusable/alerts/Message";

test("should render alert element with success message", () => {
  // Given
  render(<Message message="successful" type="success" />);

  // When
  const alertElement = screen.getByText("successful");

  // Then
  expect(alertElement).toBeInTheDocument();
});

test("should not render alert element with success message", () => {
  // Given
  render(<Message message="" type="success" />);

  // When
  const alertElement = screen.queryByText("successful");

  // Then
  expect(alertElement).not.toBeInTheDocument();
});
