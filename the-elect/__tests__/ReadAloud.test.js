import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Home from "@/app/page";

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

describe("Read Aloud Accessibility", () => {
  test("the landing page contains elements with data-read-aloud attribute", () => {
    const { container } = render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );

    const readAloudElements = container.querySelectorAll(
      '[data-read-aloud="true"]'
    );
    expect(readAloudElements.length).toBeGreaterThan(0);
  });

  test("buttons do NOT have the data-read-aloud attribute", () => {
    const { container } = render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );

    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button).not.toHaveAttribute("data-read-aloud");
    });
  });

  test("readable elements are headings or paragraphs, not interactive controls", () => {
    const { container } = render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );

    const readAloudElements = container.querySelectorAll(
      '[data-read-aloud="true"]'
    );
    readAloudElements.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      expect(["h1", "h2", "h3", "h4", "p", "li", "span"]).toContain(tag);
    });
  });
});
