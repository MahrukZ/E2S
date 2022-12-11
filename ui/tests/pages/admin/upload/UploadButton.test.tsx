import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadButton from "../../../../src/components/pages/admin/upload/UploadButton";

test("should render upload button element", () => {
    // Given
    render(<UploadButton selectedId={1} file="" />);

    // When
    const buttonElement = screen.getByTestId("uploadBtn");

    // Then
    expect(buttonElement).toBeInTheDocument();
});
