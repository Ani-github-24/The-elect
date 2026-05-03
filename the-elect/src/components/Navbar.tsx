"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const readableElements = document.querySelectorAll('[data-read-aloud="true"]');
    if (readableElements.length === 0) {
      alert("No readable content found on this page.");
      return;
    }

    const textToRead = Array.from(readableElements)
      .map((el) => (el as HTMLElement).textContent?.trim())
      .filter(Boolean)
      .join(". ");

    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Set language hint based on current selected language
    if (language === "es") utterance.lang = "es-ES";
    else if (language === "hi") utterance.lang = "hi-IN";
    else utterance.lang = "en-US";

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <nav className="fixed w-full z-50 bg-[#000000] border-b-4 border-[#FFFF00] text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-3xl font-bold text-[#FFFF00] tracking-wider">
          <a href="/">{t.nav.title}</a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleReadAloud}
            className="bg-white text-black font-bold py-2 px-4 rounded-md border-2 border-black hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-[#0000FF]"
            aria-label={isReading ? "Stop Reading" : "Read Aloud"}
          >
            {isReading ? "Stop Reading" : "Read Aloud"}
          </button>
          
          <label htmlFor="language-select" className="sr-only">
            {t.nav.language}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-[#0000FF] text-white border-2 border-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-[#FFFF00] cursor-pointer"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
