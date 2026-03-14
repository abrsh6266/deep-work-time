"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { TimerState } from "@/types";
import { setTimerState } from "@/store/slices/timerSlice";

export function useWebSocket() {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    socket.on("timer:state", (state: TimerState) => {
      dispatch(setTimerState(state));
    });

    socket.on("timer:tick", (state: TimerState) => {
      dispatch(setTimerState(state));
    });

    socket.on("timer:complete", (state: TimerState) => {
      dispatch(setTimerState(state));
      // Play notification sound
      if (typeof window !== "undefined") {
        try {
          const audioCtx = new AudioContext();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.frequency.value = 800;
          oscillator.type = "sine";
          gainNode.gain.value = 0.3;
          oscillator.start();
          setTimeout(() => {
            oscillator.stop();
            audioCtx.close();
          }, 500);
        } catch (e) {
          // Audio not available
        }
      }
    });

    return () => {
      socket.off("timer:state");
      socket.off("timer:tick");
      socket.off("timer:complete");
    };
  }, [dispatch]);

  const emit = useCallback((event: string, data?: Record<string, unknown>) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return { emit, disconnect: disconnectSocket };
}
