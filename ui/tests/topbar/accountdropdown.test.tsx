import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react'
import AccountDropdown from '../../src/components/Topbar/AccountDropdown';

afterEach(() => {
    cleanup();
});

test('should render account dropdown element', () => {
    // Given
    render(<AccountDropdown name='test' />);
    // When
    const dropDownElement = screen.getByTestId("dropdownButton");
    // Then
    expect(dropDownElement).toBeInTheDocument();
});

test('should render props in name section', () => {
    // Given
    render(<AccountDropdown name="Test Name" />);
    // When
    const accountElement = screen.getByTestId("accountName");
    // Then
    expect(accountElement).toHaveTextContent("Test Name");
});