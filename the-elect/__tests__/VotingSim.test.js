import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VirtualVotingSim } from "@/components/VirtualVotingSim";

// Mock SpeechSynthesis
beforeAll(() => {
  Object.defineProperty(window, "speechSynthesis", {
    value: { cancel: jest.fn(), speak: jest.fn() },
    writable: true,
  });
});

// Mock alert
beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

describe("Virtual Voting Simulator", () => {
  test("renders Step 1 with candidate options", () => {
    render(<VirtualVotingSim />);
    expect(
      screen.getByText("Step 1: Select Your Candidate")
    ).toBeInTheDocument();
    expect(screen.getByText("Candidate A")).toBeInTheDocument();
    expect(screen.getByText("Candidate B")).toBeInTheDocument();
    expect(screen.getByText("Candidate C")).toBeInTheDocument();
  });

  test("does not advance to Step 2 without selecting a candidate", () => {
    render(<VirtualVotingSim />);
    fireEvent.click(screen.getByText("Next"));
    // Should still show Step 1
    expect(
      screen.getByText("Step 1: Select Your Candidate")
    ).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith("Please select a candidate.");
  });

  test("advances to Step 2 after selecting a candidate", () => {
    render(<VirtualVotingSim />);
    // Select Candidate A via its radio input
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[0]);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/Step 2: City Measure/)).toBeInTheDocument();
  });

  test("can navigate back from Step 2 to Step 1", () => {
    render(<VirtualVotingSim />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[0]);
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Back"));
    expect(
      screen.getByText("Step 1: Select Your Candidate")
    ).toBeInTheDocument();
  });
});
