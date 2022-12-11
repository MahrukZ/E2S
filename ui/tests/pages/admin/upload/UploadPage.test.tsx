import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadPage from "../../../../src/components/pages/admin/upload/UploadPage";

test("should render upload page title element", () => {
    // Given
    render(<UploadPage setTopbarTitle={jest.fn()} />);

    // When
    const uploadPageElement = screen.getByTestId("uploadElement");

    // Then
    expect(uploadPageElement).toBeInTheDocument();
});
