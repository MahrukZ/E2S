import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../../src/App'
import "@types/jest"

//Cannot render Sidebar independently due to routes, App is rendered to test Sidebar

test('should render menuIconOpen element', () => {
    // Given
    render(<App />);

    // When
    const menuIconOpenElement = screen.getByTestId("menuIconOpen");

    // Then
    expect(menuIconOpenElement).toBeInTheDocument();
})

test('should render menuIconClose element', () => {
    // Given
    render(<App />);

    // When
    const menuIconCloseElement = screen.getByTestId("menuIconClose");

    // Then
    expect(menuIconCloseElement).toBeVisible();
})

test('sidebar element should be hidden', () => {
    // Given
    render(<App />);
    
    // When
    const sideBarElement = screen.queryByTestId("sidebarMenu")
    const closeMenu = screen.getByTestId('menuIconClose');
    fireEvent.mouseEnter(closeMenu);

    // Then
    if (sideBarElement) {
        expect(sideBarElement).toHaveStyle(`left: -100%`)
    }
    expect(sideBarElement).toBeVisible();

});


