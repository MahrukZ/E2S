import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react'
import Topbar from '../../src/components/reusable/Topbar/Topbar'

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
    const settingsElement = screen.queryByTestId("settingsDropdown-1");
    const signOutElement = screen.queryByTestId("signOutDropdown-1");
    // Then
    expect(settingsElement).not.toBeInTheDocument();
    expect(signOutElement).not.toBeInTheDocument();
});

test('dropdown elements should be visible after mouse enter', () => {
    // Given
    render(<Topbar />);
    // When
    const dropdownContainer = screen.getByTestId("dropdownButton-1");
    fireEvent.mouseEnter(dropdownContainer);
    const settingsElement = screen.queryByTestId("settingsDropdown-1");
    const signOutElement = screen.queryByTestId("signOutDropdown-1");
    // Then
    expect(settingsElement).toBeInTheDocument();
    expect(signOutElement).toBeInTheDocument();
});

// not working yet
// test('dropdown elements should be invisible after mouse leave', async () => {
//     // Given
//     render(<Topbar />);
//     // When
//     const dropdownContainer = screen.getByTestId("dropdownButton-1");
//     fireEvent.mouseEnter(dropdownContainer);

//     await waitFor(() => {
//         const settingsElement = screen.queryByTestId("settingsDropdown-1");
//         const signOutElement = screen.queryByTestId("signOutDropdown-1");
//         // Then
//         expect(settingsElement).toBeInTheDocument();
//         expect(signOutElement).toBeInTheDocument();      
//     });

//     fireEvent.mouseLeave(dropdownContainer);
    
//     await waitFor(() => {
//         const dropdownMenu = screen.queryByTestId("dropdownMenu-1");
//         // Then
//         expect(dropdownMenu).toHaveAttribute("show", false);
//     });

// });