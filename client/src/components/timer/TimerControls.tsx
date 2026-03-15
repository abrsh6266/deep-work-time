"use client";

import { useTimer } from "@/hooks/useTimer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SessionType } from "@/types";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import clsx from "clsx";

export default function TimerControls() {
  const {
    isRunning,
    isPaused,
    sessionType,
    start,
    pause,
    reset,
    stop,
    setType,
  } = useTimer();
  const selectedTaskId = useSelector(
    (state: RootState) => state.tasks.selectedTaskId,
  );

  const sessionTypes = [
    { type: SessionType.FOCUS, label: "Focus" },
    { type: SessionType.SHORT_BREAK, label: "Short Break" },
    { type: SessionType.LONG_BREAK, label: "Long Break" },
  ];

  const handleStart = () => {
    start(sessionType, selectedTaskId);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Session type selector */}
      <div className="flex gap-2 bg-gray-900 p-1 rounded-xl">
        {sessionTypes.map((st) => (
          <button
            key={st.type}
            onClick={() => setType(st.type)}
            disabled={isRunning}
            className={clsx(
              "px-5 py-2 rounded-lg text-sm font-medium transition-all",
              sessionType === st.type
                ? "bg-gray-700 text-white"
                : "text-gray-500 hover:text-gray-300",
              isRunning && "opacity-50 cursor-not-allowed",
            )}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Main controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-all"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={isRunning ? pause : handleStart}
          className={clsx(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
            isRunning
              ? "bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/25"
              : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/25",
          )}
        >
          {isRunning ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-0.5" />
          )}
        </button>

        <button
          onClick={stop}
          disabled={!isRunning && !isPaused}
          className={clsx(
            "w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center transition-all",
            isRunning || isPaused
              ? "hover:bg-red-900/50 text-red-400 hover:text-red-300"
              : "text-gray-700 cursor-not-allowed",
          )}
          title="Stop"
        >
          <Square className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
