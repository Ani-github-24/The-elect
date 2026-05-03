import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImpactSlider } from "@/components/ImpactSlider";

describe("Impact Slider (Power of One)", () => {
  test("renders with default turnout of 30%", () => {
    render(<ImpactSlider />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("30");
  });

  test("displays candidate vote counts", () => {
    render(<ImpactSlider />);
    expect(screen.getByText("Candidate A")).toBeInTheDocument();
    expect(screen.getByText("Candidate B")).toBeInTheDocument();
  });

  test("updates vote counts when slider changes", () => {
    render(<ImpactSlider />);
    const slider = screen.getByRole("slider");

    // Get initial vote text
    const initialText = screen.getByText(/Margin of Victory/).textContent;

    // Move slider to 80%
    fireEvent.change(slider, { target: { value: "80" } });
    expect(slider).toHaveValue("80");

    // Margin text should have changed
    const updatedText = screen.getByText(/Margin of Victory/).textContent;
    expect(updatedText).not.toBe(initialText);
  });

  test("has data-read-aloud attributes on readable content", () => {
    const { container } = render(<ImpactSlider />);
    const readable = container.querySelectorAll('[data-read-aloud="true"]');
    expect(readable.length).toBeGreaterThanOrEqual(2);
  });
});
