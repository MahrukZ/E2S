import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Upload from "../../../../src/components/pages/admin/upload/Upload";

test("should render form element", () => {
  // Given
  render(<Upload />);

  // When
  const formElement = document.getElementById("formFile");

  // Then
  expect(formElement).toBeInTheDocument();
});
