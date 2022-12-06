import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardGraphs from '../../../src/components/reusable/graphs/DashboardGraphs';
import "jest";
import 'jest-canvas-mock';


test('should render the graph container', () => {
    // Given
    render(<DashboardGraphs />);

    // When
    const graphContainerElement = screen.getByTestId("graphContainer");

    // Then
    expect(graphContainerElement).toBeInTheDocument();
});
