"use client";

import { useTimer } from "@/hooks/useTimer";
import { SessionType } from "@/types";
import clsx from "clsx";

export default function TimerDisplay() {
  const {
    secondsRemaining,
    totalSeconds,
    sessionType,
    formatTime,
    isRunning,
    isPaused,
    progress,
  } = useTimer();

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorMap = {
    [SessionType.FOCUS]: {
      ring: "stroke-blue-500",
      bg: "text-blue-500",
      glow: "drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    },
    [SessionType.SHORT_BREAK]: {
      ring: "stroke-green-500",
      bg: "text-green-500",
      glow: "drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]",
    },
    [SessionType.LONG_BREAK]: {
      ring: "stroke-purple-500",
      bg: "text-purple-500",
      glow: "drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    },
  };

  const colors = colorMap[sessionType];

  return (
    <div className="flex flex-col items-center">
      <div className={clsx("relative", isRunning && colors.glow)}>
        <svg width="320" height="320" className="-rotate-90">
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-800"
          />
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={clsx(colors.ring, "transition-all duration-1000")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-mono font-bold text-white tracking-tight">
            {formatTime(secondsRemaining)}
          </span>
          <span
            className={clsx(
              "text-sm font-medium mt-2 uppercase tracking-widest",
              colors.bg,
            )}
          >
            {sessionType === SessionType.FOCUS
              ? "Focus"
              : sessionType === SessionType.SHORT_BREAK
                ? "Short Break"
                : "Long Break"}
          </span>
          {(isRunning || isPaused) && (
            <span className="text-gray-500 text-xs mt-1">
              {isRunning ? "Running" : "Paused"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
