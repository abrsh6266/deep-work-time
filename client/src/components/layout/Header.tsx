"use client";

import { useTimer } from "@/hooks/useTimer";
import { SessionType } from "@/types";
import { Flame } from "lucide-react";

export default function Header() {
  const {
    isRunning,
    sessionType,
    pomodorosCompleted,
    formatTime,
    secondsRemaining,
  } = useTimer();

  return (
    <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-white font-semibold text-lg">
            {isRunning
              ? sessionType === SessionType.FOCUS
                ? "Focus Session Active"
                : "Break Time"
              : "Ready to Focus"}
          </h2>
          {isRunning && (
            <p className="text-blue-400 text-sm font-mono">
              {formatTime(secondsRemaining)} remaining
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-white text-sm font-semibold">
            {pomodorosCompleted}
          </span>
          <span className="text-gray-500 text-sm">pomodoros today</span>
        </div>
      </div>
    </header>
  );
}
