"use client";

import { disconnectSocket, getSocket } from "@/lib/socket";
import { setTimerState } from "@/store/slices/timerSlice";
import { TimerState } from "@/types";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

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
    });

    // Play notification sounds

    if (typeof window !== "undefined") {
      try {
        const audioCtx = new AudioContext();
        const oscilator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscilator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscilator.frequency.value = 800;
        oscilator.type = "sine";
        gainNode.gain.value = 0.3;
        oscilator.start();
        setTimeout(() => {
          oscilator.stop();
          audioCtx.close();
        }, 500);
      } catch (error) {
        // Audio not available
      }
    }

    return () => {
      socket.off("timer:state");
      socket.off("timer:tick");
      socket.off("timer:complete");
    };
  }, [dispatch]);

  const emit = useCallback((event: string, data?: Record<string, unknown>) => {
    if (socketRef.current) {
      socketRef.current.emit(event);
    }
  }, []);
  return { emit, disconnect: disconnectSocket };
}
