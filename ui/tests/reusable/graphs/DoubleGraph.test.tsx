import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DoubleGraph from '../../../src/components/reusable/graphs/DoubleGraph';
import "jest";
import 'jest-canvas-mock';

const mockData = {
        xData0: [],
        yData0: [],
        yData1: [],
        xName: "",
        yName: "",
        lineColour0: "",
        lineColour1: "",
        name0: "",
        name1: ""
}

test('should render a double graph', () => {
    // Given
    render(<DoubleGraph graphData={mockData}/>);

    // When
    const graphElement = screen.getByTestId("graphElement");

    // Then
    expect(graphElement).toBeInTheDocument();
});
