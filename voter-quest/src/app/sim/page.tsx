"use client";

import { VirtualVotingSim } from "@/components/VirtualVotingSim";

export default function SimPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] text-white p-6">
      <VirtualVotingSim />
    </div>
  );
}
