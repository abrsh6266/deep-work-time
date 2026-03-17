"use client";

import FocusScoreCard from "@/components/stats/FocusScoreCard";
import PomodoroTimer from "@/components/timer/PomodoroTimer";
import React from "react";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <PomodoroTimer />
      <FocusScoreCard />
    </div>
  );
}
