import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PdfDownloadBtn from "../../../src/components/reusable/buttons/PdfDownloadBtn";

test("should render download button element", () => {
    // Given
    render(
        <PdfDownloadBtn rootElementId="testId" downloadFileName="testFile" />
    );

    // When
    const downloadBtnElement = screen.getByText("Download");

    // Then
    expect(downloadBtnElement).toBeInTheDocument();
});
