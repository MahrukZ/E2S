import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Topbar from "../../../src/components/reusable/topbar/Topbar";

afterEach(() => {
  cleanup();
});

test("should render Nav element", () => {
  // Given
  render(<Topbar />);
  // When
  const navElement = screen.getByTestId("topbar");
  // Then
  expect(navElement).toBeInTheDocument();
});

test("dropdown elements should not be visible initially", () => {
  // Given
  render(<Topbar />);
  // When
  const settingsElement = screen.queryByTestId("settingsDropdown");
  const signOutElement = screen.queryByTestId("signOutDropdown");
  // Then
  expect(settingsElement).not.toBeInTheDocument();
  expect(signOutElement).not.toBeInTheDocument();
});

test("dropdown elements should be visible after mouse enter", () => {
  // Given
  render(<Topbar />);
  // When
  const dropdownContainer = screen.getByTestId("dropdownButton");
  fireEvent.mouseEnter(dropdownContainer);
  const settingsElement = screen.queryByTestId("settingsDropdown");
  const signOutElement = screen.queryByTestId("signOutDropdown");
  // Then
  expect(settingsElement).toBeInTheDocument();
  expect(signOutElement).toBeInTheDocument();
});
