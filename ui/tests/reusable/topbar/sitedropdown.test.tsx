import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import SiteDropdown from '../../../src/components/reusable/topbar/SiteDropdown';
import SiteAndUser from '../../../src/data/SiteAndUser';

afterEach(() => {
    cleanup();
});

const site1 = new SiteAndUser(1, "test site 1");
const site2 = new SiteAndUser(2, "test site 2");
const site3 = new SiteAndUser(3, "test site 3");
const siteList = [site1, site2, site3]

test('should render Dropdown element', () => {
    // Given
    render(<SiteDropdown sites={siteList} />);
    // When
    const dropdown = screen.getByTestId("siteDropdown");
    // Then
    expect(dropdown).toBeInTheDocument();
});

test('should render correct amount of sites from props', () => {
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


test('should render correct site id from props', () => {
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

test('should render correct site name from props', () => {
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
