"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed w-full z-50 bg-[#000000] border-b-4 border-[#FFFF00] text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-[#FFFF00] tracking-wider">
          {t.nav.title}
        </div>
        <div className="flex items-center gap-4">
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
