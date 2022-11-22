import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import AccountDropdown from '../../../src/components/reusable/topbar/AccountDropdown';

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