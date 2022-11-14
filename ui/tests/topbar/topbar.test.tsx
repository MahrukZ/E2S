import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import Topbar from '../../src/components/reusable/Topbar/Topbar'

test('should render Nav element', () => {
    // Given
    render(<Topbar />);

    // When
    const navElement = screen.getByTestId("account-1");

    // Then
    expect(navElement).toBeInTheDocument();
})