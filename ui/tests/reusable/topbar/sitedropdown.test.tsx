import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import SiteDropdown from "../../../src/components/reusable/topbar/SiteDropdown";
import { ISiteAndUser } from "../../../src/components/reusable/topbar/Topbar";

afterEach(() => {
  cleanup();
});

const siteList: ISiteAndUser[] = [
  {
    siteId: 1,
    siteName: "test site 1",
  },
  {
    siteId: 2,
    siteName: "test site 2",
  },
  {
    siteId: 3,
    siteName: "test site 3",
  },
];

test("should render Dropdown element", () => {
  // Given
  render(<SiteDropdown sites={siteList} />);

  // When
  const dropdown = screen.getByTestId("siteDropdown");

  // Then
  expect(dropdown).toBeInTheDocument();
});

test("should render correct amount of sites from props", () => {
  // Given
  render(<SiteDropdown sites={siteList} />);

  // When
  const dropdown0 = screen.getByTestId("0");
  const dropdown1 = screen.getByTestId("1");
  const dropdown2 = screen.getByTestId("2");

  // Then
  expect(dropdown0).toBeInTheDocument();
  expect(dropdown1).toBeInTheDocument();
  expect(dropdown2).toBeInTheDocument();
});

test("should render correct site id from props", () => {
  // Given
  render(<SiteDropdown sites={siteList} />);

  // When
  const dropdown0 = screen.getByTestId("0");
  const dropdown1 = screen.getByTestId("1");
  const dropdown2 = screen.getByTestId("2");

  // Then
  expect(dropdown0).toHaveValue("1");
  expect(dropdown1).toHaveValue("2");
  expect(dropdown2).toHaveValue("3");
});

test("should render correct site name from props", () => {
  // Given
  render(<SiteDropdown sites={siteList} />);

  // When
  const dropdown0 = screen.getByTestId("0");
  const dropdown1 = screen.getByTestId("1");
  const dropdown2 = screen.getByTestId("2");

  // Then
  expect(dropdown0).toHaveTextContent("test site 1");
  expect(dropdown1).toHaveTextContent("test site 2");
  expect(dropdown2).toHaveTextContent("test site 3");
});
