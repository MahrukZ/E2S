import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import Insight from '../../../src/components/reusable/insights/Insight';

afterEach(() => {
    cleanup();
});

const mockData = {
    title: "title",
    insightList: ["insight 1", "insight 2"],
};

test('should render an insight', () => {
    // Given
    render(<Insight insightData={mockData} />);
    // When
    const insightElement = screen.getByTestId("insight");
    // Then
    expect(insightElement).toBeInTheDocument();
});



