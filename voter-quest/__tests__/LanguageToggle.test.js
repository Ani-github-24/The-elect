import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

// Mock SpeechSynthesis to prevent errors in test environment
beforeAll(() => {
  Object.defineProperty(window, "speechSynthesis", {
    value: {
      cancel: jest.fn(),
      speak: jest.fn(),
    },
    writable: true,
  });
});

function renderWithProvider(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("Language Toggle", () => {
  test("renders the language dropdown with English selected by default", () => {
    renderWithProvider(<Navbar />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("en");
  });

  test("updates the language to Spanish when changed", () => {
    renderWithProvider(<Navbar />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "es" } });
    expect(select.value).toBe("es");
  });

  test("updates the language to Hindi when changed", () => {
    renderWithProvider(<Navbar />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "hi" } });
    expect(select.value).toBe("hi");
  });
});
