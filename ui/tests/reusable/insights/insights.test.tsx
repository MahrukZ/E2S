import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import Insights from '../../../src/components/reusable/insights/insights';

afterEach(() => {
    cleanup();
});

test('should render an insight', () => {
    // Given
    render(<Insights />);
    // When
    const insightElement = screen.getByTestId("insightsCost");
    // Then
    expect(insightElement).toBeInTheDocument();
});



