import { render, screen } from "@testing-library/react";
import VeryComplex from "./VeryComplex";

jest.mock(
  "./complex_component/inner_complex/inner_inner_complex/ComplexComponent"
);

describe("VeryComplex", () => {
  it("renders VeryComplex component", () => {
    render(<VeryComplex />);
    expect(screen.getByText("Simple Version")).toBeInTheDocument();
  });
});
