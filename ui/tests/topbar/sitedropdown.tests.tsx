import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react'
import SiteDropdown from '../../src/components/Topbar/SiteDropdown'

afterEach(() => {
    cleanup();
});

test('should render Dropdown element', () => {
    // Given
    render(<SiteDropdown />);
    // When
    const dropdown = screen.getByTestId("siteDropdown");
    // Then
    expect(dropdown).toBeInTheDocument();
});