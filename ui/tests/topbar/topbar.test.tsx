import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react'
import Topbar from '../../src/components/Topbar/Topbar'

afterEach(() => {
    cleanup();
});

test('should render Nav element', () => {
    // Given
    render(<Topbar />);
    // When
    const navElement = screen.getByTestId("topbar");
    // Then
    expect(navElement).toBeInTheDocument();
});

test('dropdown elements should not be visible initially', () => {
    // Given
    render(<Topbar />);
    // When
    const settingsElement = screen.queryByTestId("settingsDropdown");
    const signOutElement = screen.queryByTestId("signOutDropdown");
    // Then
    expect(settingsElement).not.toBeInTheDocument();
    expect(signOutElement).not.toBeInTheDocument();
});

test('dropdown elements should be visible after mouse enter', () => {
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

