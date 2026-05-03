"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Mock data for 3 states
const stateRequirements: Record<string, { name: string; ids: string[] }> = {
  CA: {
    name: "California",
    ids: [
      "California Driver's License or ID Card",
      "U.S. Passport",
      "Student ID with Name and Photo",
    ],
  },
  TX: {
    name: "Texas",
    ids: [
      "Texas Driver License",
      "Texas Election Identification Certificate",
      "Texas Personal Identification Card",
      "U.S. Military Identification Card",
      "U.S. Citizenship Certificate with Photo",
      "U.S. Passport",
    ],
  },
  NY: {
    name: "New York",
    ids: [
      "No ID required for most voters if identity verified at registration.",
      "If not verified: Driver's License or last 4 digits of SSN.",
      "Valid Photo ID",
      "Current Utility Bill, Bank Statement, or Government Document",
    ],
  },
};

export function VoterPrepDashboard() {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleRemindMe = () => {
    if (!selectedState) {
      alert("Please select a state first!");
      return;
    }
    const stateInfo = stateRequirements[selectedState];
    const idList = stateInfo.ids.map((id) => `- ${id}`).join("\n");
    alert(
      `Reminder for ${stateInfo.name}:\n\nPlease bring one of the following accepted IDs:\n${idList}`
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 bg-[#000000] border-4 border-[#FFFF00] my-12">
      <h2 className="text-4xl font-extrabold mb-8 text-[#FFFF00] uppercase border-b-4 border-white pb-4" data-read-aloud="true">
        Voter Prep Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: ID Requirements */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white uppercase" data-read-aloud="true">State ID Requirements</h3>
          <div>
            <label htmlFor="state-select" className="block text-xl font-bold text-[#FFFF00] mb-2">
              Select Your State/Region
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#0000FF] text-white border-4 border-white font-bold py-3 px-4 rounded-none focus:outline-none focus:ring-4 focus:ring-[#FFFF00] cursor-pointer text-xl"
            >
              <option value="" disabled>-- Choose a State --</option>
              {Object.entries(stateRequirements).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.name}
                </option>
              ))}
            </select>
          </div>

          {selectedState && (
            <div className="bg-white text-black p-6 border-4 border-[#0000FF]">
              <h4 className="text-xl font-black uppercase mb-4 text-[#0000FF]">
                Acceptable Government IDs in {stateRequirements[selectedState].name}:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-lg font-bold">
                {stateRequirements[selectedState].ids.map((id, index) => (
                  <li key={index}>{id}</li>
                ))}
              </ul>
              <button
                onClick={handleRemindMe}
                className="mt-6 w-full bg-[#FFFF00] text-black font-black py-3 px-6 uppercase tracking-widest border-4 border-black hover:bg-black hover:text-[#FFFF00] hover:border-[#FFFF00] transition-colors"
              >
                Remind Me
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Polling Location */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white uppercase" data-read-aloud="true">Find Polling Location</h3>
          <div>
            <label htmlFor="address-input" className="block text-xl font-bold text-[#FFFF00] mb-2">
              Enter Mock Address
            </label>
            <input
              id="address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 123 Main St, Springfield"
              className="w-full bg-black text-white border-4 border-white font-bold py-3 px-4 rounded-none focus:outline-none focus:ring-4 focus:ring-[#FFFF00] text-xl placeholder-gray-500"
            />
          </div>

          <div className="w-full h-64 bg-gray-800 border-4 border-[#0000FF] flex items-center justify-center relative overflow-hidden">
            {address ? (
              <div className="text-center">
                <span className="text-2xl font-black text-[#FFFF00] animate-pulse uppercase">
                  Map Loading...
                </span>
                <p className="text-white mt-2 font-bold">Searching for: {address}</p>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-400">Enter address to load map</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
