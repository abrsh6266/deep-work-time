"use client";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useWebSocket } from "./useWebSocket";
import { SessionType } from "@/types";

export function useTimer() {
  const timerState = useSelector((state: RootState) => state.timer);
  const { emit } = useWebSocket();

  const start = useCallback(
    (sessionType?: SessionType, taskId?: string | null) => {
      emit("timer:start", { sessionType, taskId });
    },
    [emit],
  );

  const pause = useCallback(() => {
    emit("timer:pause");
  }, [emit]);

  const reset = useCallback(() => {
    emit("timer:reset");
  }, [emit]);

  const stop = useCallback(() => {
    emit("timer:stop");
  }, [emit]);

  const setType = useCallback(
    (sessionType: SessionType) => {
      emit("timer:setType", { sessionType });
    },
    [emit],
  );

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const progress =
    timerState.totalSeconds > 0
      ? ((timerState.totalSeconds - timerState.secondsRemaining) /
          timerState.totalSeconds) *
        100
      : 0;

  return {
    ...timerState,
    start,
    pause,
    reset,
    stop,
    setType,
    formatTime,
    progress,
  };
}
