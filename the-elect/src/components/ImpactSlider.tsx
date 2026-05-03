"use client";

import React, { useState, useEffect } from "react";

export function ImpactSlider() {
  const [turnout, setTurnout] = useState<number>(30); // Default 30%

  // Total possible voters in a small local election
  const totalEligible = 5000;

  // Calculate votes
  // Let's say Cand A always gets slightly more of the new turnout
  const activeVoters = Math.floor(totalEligible * (turnout / 100));
  
  // Base split: Cand A gets 50%, Cand B gets 50%.
  // For every percent above 10%, Cand A gets slightly more of the marginal votes.
  const candAVotes = Math.floor(activeVoters * 0.502);
  const candBVotes = activeVoters - candAVotes;

  const margin = Math.abs(candAVotes - candBVotes);
  
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 bg-[#000000] border-4 border-[#0000FF] mb-12">
      <div className="text-center mb-8 focus:outline-none" tabIndex={0}>
        <h2 className="text-4xl font-extrabold mb-4 text-[#FFFF00] uppercase" data-read-aloud="true">
          The Power of One
        </h2>
        <p className="text-xl text-white font-bold" data-read-aloud="true">
          See how a small shift in voter turnout dramatically changes local election margins.
        </p>
      </div>

      <div className="bg-white p-8 border-4 border-black">
        <label htmlFor="turnout-slider" className="block text-2xl font-black text-black uppercase mb-4">
          Voter Turnout: <span className="text-[#0000FF]">{turnout}%</span>
        </label>
        
        <input
          id="turnout-slider"
          type="range"
          min="10"
          max="100"
          value={turnout}
          onChange={(e) => setTurnout(parseInt(e.target.value))}
          className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0000FF] accent-[#0000FF]"
          aria-valuemin={10}
          aria-valuemax={100}
          aria-valuenow={turnout}
        />

        <div className="mt-8">
          <p className="text-lg font-bold text-gray-600 uppercase mb-2">
            Theoretical Election Results (Total Votes: {activeVoters.toLocaleString()})
          </p>
          <p className="text-xl font-black mb-6">
            Margin of Victory: {margin === 0 ? "TIED!" : `${margin.toLocaleString()} Vote${margin !== 1 ? 's' : ''}`}
          </p>

          {/* Bar Chart */}
          <div className="space-y-6">
            {/* Candidate A Bar */}
            <div>
              <div className="flex justify-between mb-1 font-bold">
                <span>Candidate A</span>
                <span>{candAVotes.toLocaleString()} votes</span>
              </div>
              <div className="w-full bg-gray-200 h-8 border-2 border-black relative overflow-hidden">
                <div 
                  className="bg-[#0000FF] h-full transition-all duration-300 ease-out"
                  style={{ width: `${activeVoters > 0 ? (candAVotes / activeVoters) * 100 : 50}%` }}
                ></div>
              </div>
            </div>

            {/* Candidate B Bar */}
            <div>
              <div className="flex justify-between mb-1 font-bold">
                <span>Candidate B</span>
                <span>{candBVotes.toLocaleString()} votes</span>
              </div>
              <div className="w-full bg-gray-200 h-8 border-2 border-black relative overflow-hidden">
                <div 
                  className="bg-[#FFFF00] h-full transition-all duration-300 ease-out"
                  style={{ width: `${activeVoters > 0 ? (candBVotes / activeVoters) * 100 : 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
