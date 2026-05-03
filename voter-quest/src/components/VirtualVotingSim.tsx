"use client";

import React, { useState } from "react";

export function VirtualVotingSim() {
  const [step, setStep] = useState(1);
  const [candidate, setCandidate] = useState("");
  const [measure, setMeasure] = useState("");

  const handleNext = () => {
    if (step === 1 && !candidate) {
      alert("Please select a candidate.");
      return;
    }
    if (step === 2 && !measure) {
      alert("Please vote on the measure.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Simulation complete! Your mock vote has been submitted.");
    setStep(1);
    setCandidate("");
    setMeasure("");
  };

  const CandidateOptions = [
    { id: "candA", name: "Candidate A" },
    { id: "candB", name: "Candidate B" },
    { id: "candC", name: "Candidate C" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 bg-black border-4 border-white mb-12">
      <h2 className="text-4xl font-extrabold mb-8 text-[#FFFF00] uppercase border-b-4 border-white pb-4" tabIndex={0}>
        Virtual Voting Simulator
      </h2>

      <div className="bg-[#0000FF] p-8 border-4 border-white min-h-[400px] flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white uppercase mb-6" tabIndex={0}>Step 1: Select Your Candidate</h3>
              <div className="space-y-4">
                {CandidateOptions.map((cand) => (
                  <label
                    key={cand.id}
                    className={`block border-4 p-4 cursor-pointer focus-within:ring-4 focus-within:ring-[#FFFF00] ${
                      candidate === cand.id ? "bg-white text-black border-black" : "bg-black text-white border-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="candidate"
                      value={cand.id}
                      checked={candidate === cand.id}
                      onChange={() => setCandidate(cand.id)}
                      className="sr-only"
                    />
                    <span className="text-xl font-bold uppercase">{cand.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white uppercase mb-6 flex items-center gap-2" tabIndex={0}>
                Step 2: City Measure
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FFFF00] text-black font-black text-xl cursor-help relative group"
                  tabIndex={0}
                  aria-label="A Measure is a proposed law or policy that citizens vote on directly."
                >
                  ?
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus:block bg-white text-black p-4 w-64 border-4 border-black text-sm z-10 shadow-xl">
                    <p className="font-bold">A "Measure" is a proposed law or policy that citizens vote on directly.</p>
                  </div>
                </span>
              </h3>
              <div className="space-y-4">
                <label
                  className={`block border-4 p-4 cursor-pointer focus-within:ring-4 focus-within:ring-[#FFFF00] ${
                    measure === "yes" ? "bg-white text-black border-black" : "bg-black text-white border-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="measure"
                    value="yes"
                    checked={measure === "yes"}
                    onChange={() => setMeasure("yes")}
                    className="sr-only"
                  />
                  <span className="text-xl font-bold uppercase">Yes</span>
                </label>
                <label
                  className={`block border-4 p-4 cursor-pointer focus-within:ring-4 focus-within:ring-[#FFFF00] ${
                    measure === "no" ? "bg-white text-black border-black" : "bg-black text-white border-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="measure"
                    value="no"
                    checked={measure === "no"}
                    onChange={() => setMeasure("no")}
                    className="sr-only"
                  />
                  <span className="text-xl font-bold uppercase">No</span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white uppercase mb-6" tabIndex={0}>Step 3: Review & Submit</h3>
              <div className="bg-white text-black p-6 border-4 border-black space-y-4 font-bold text-xl">
                <div>
                  <span className="text-gray-600 uppercase text-sm block">Selected Candidate:</span>
                  {CandidateOptions.find(c => c.id === candidate)?.name}
                </div>
                <div>
                  <span className="text-gray-600 uppercase text-sm block">City Measure Vote:</span>
                  {measure.toUpperCase()}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t-4 border-white flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="bg-black text-white font-black py-3 px-8 uppercase tracking-widest border-4 border-white hover:bg-white hover:text-black focus:ring-4 focus:ring-[#FFFF00]"
              >
                Back
              </button>
            ) : (
              <div></div> // Spacer
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#FFFF00] text-black font-black py-3 px-8 uppercase tracking-widest border-4 border-black hover:bg-white focus:ring-4 focus:ring-white"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#FFFF00] text-black font-black py-3 px-8 uppercase tracking-widest border-4 border-black hover:bg-white focus:ring-4 focus:ring-white"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
