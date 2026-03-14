import { SessionType, TimerState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TimerState = {
  currentTaskId: null,
  isPaused: false,
  isRunning: false,
  pomodorosCompleted: 0,
  secondsRemaining: 25 * 60,
  sessionType: SessionType.FOCUS,
  startedAt: null,
  totalSeconds: 25 * 60,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerState(state, action: PayloadAction<TimerState>) {
      return { ...action.payload };
    },
    setSessionType(state, action: PayloadAction<SessionType>) {
      state.sessionType = action.payload;
      switch (action.payload) {
        case SessionType.FOCUS:
          state.secondsRemaining = 60 * 25;
          state.totalSeconds = 60 * 25;
          break;
        case SessionType.SHORT_BREAK:
          state.secondsRemaining = 5 * 25;
          state.totalSeconds = 5 * 25;
        case SessionType.LONG_BREAK:
          state.secondsRemaining = 15 * 25;
          state.totalSeconds = 15 * 25;
      }
    },
    setCurrentTaskId(state, action: PayloadAction<string | null>) {
      state.currentTaskId = action.payload;
    },
    tick(state) {
      if (state.secondsRemaining > 0) {
        state.secondsRemaining -= 1;
      }
    },
  },
});

export const { setCurrentTaskId, setSessionType, setTimerState, tick } =
  timerSlice.actions;
export default timerSlice.reducer;
