import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadButton from '../../../src/components/pages/upload/UploadButton'

test('should render form element', () => {
    // Given
    render(<UploadButton file=""/>);

    // When
    const buttonElement = screen.getByTestId("uploadBtn");

    // Then
    expect(buttonElement).toBeInTheDocument();
});

