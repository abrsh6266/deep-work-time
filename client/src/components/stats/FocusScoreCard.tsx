"use client";

import { useStats } from "@/hooks/useStats";
import clsx from "clsx";

export default function FocusScoreCard() {
  const { dailyScore } = useStats();

  if (!dailyScore) return null;

  const score = dailyScore.score;
  const scoreColor =
    score >= 80
      ? "text-green-400"
      : score >= 50
        ? "text-yellow-400"
        : score >= 25
          ? "text-orange-400"
          : "text-red-400";

  const ringColor =
    score >= 80
      ? "stroke-green-500"
      : score >= 50
        ? "stroke-yellow-500"
        : score >= 25
          ? "stroke-orange-500"
          : "stroke-red-500";

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="128" height="128" className="-rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-800"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={clsx(ringColor, "transition-all duration-700")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx("text-2xl font-bold", scoreColor)}>
            {score}
          </span>
          <span className="text-gray-500 text-xs">/ 100</span>
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-lg mb-3">
          Today&apos;s Focus Score
        </h3>
        <div className="space-y-1.5">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">
              {dailyScore.focusMinutes}
            </span>{" "}
            minutes focused
          </p>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">
              {dailyScore.completedSessions}
            </span>{" "}
            sessions completed
          </p>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">
              {dailyScore.completedTasks}
            </span>{" "}
            tasks done
          </p>
        </div>
      </div>
    </div>
  );
}
