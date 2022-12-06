import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("should render both sidebar elements", () => {
  // Given
  render(<App />);

  // When
  const collapsedSideBarElement = screen.queryByTestId("collapsedSideBar");
  const sideBarElement = screen.queryByTestId("sidebarMenu");

  // Then
  expect(collapsedSideBarElement).toBeInTheDocument();
  expect(sideBarElement).toBeInTheDocument();
});

test("should render topbar", () => {
  // Given
  render(<App />);

  // When
  const topBarElement = screen.queryByTestId("topbar");

  // Then
  expect(topBarElement).toBeInTheDocument();
});
