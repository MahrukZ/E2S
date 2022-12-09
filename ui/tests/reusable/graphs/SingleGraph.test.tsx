import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SingleGraph from '../../../src/components/reusable/graphs/SingleGraph';
import "jest";
import 'jest-canvas-mock';

const mockData = {
        xData: [],
        yData: [],
        xName: "",
        yName: "",
        lineColour: ""
}

test('should render a single graph', () => {
    // Given
    render(<SingleGraph graphData={mockData}/>);

    // When
    const graphElement = screen.getByTestId("graphElement");

    // Then
    expect(graphElement).toBeInTheDocument();
});
