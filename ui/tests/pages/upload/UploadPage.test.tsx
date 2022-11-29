import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadPage from '../../../src/components/pages/upload/UploadPage'

test('should render upload page title element', () => {
    // Given
    render(<UploadPage />);

    // When
    const uploadPageElement = screen.getByText("Upload Page")

    // Then
    expect(uploadPageElement).toBeInTheDocument();
});