import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimerState, SessionType } from "@/types";

const initialState: TimerState = {
  isRunning: false,
  isPaused: false,
  secondsRemaining: 25 * 60,
  totalSeconds: 25 * 60,
  sessionType: SessionType.FOCUS,
  currentTaskId: null,
  pomodorosCompleted: 0,
  startedAt: null,
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
          state.secondsRemaining = 25 * 60;
          state.totalSeconds = 25 * 60;
          break;
        case SessionType.SHORT_BREAK:
          state.secondsRemaining = 5 * 60;
          state.totalSeconds = 5 * 60;
          break;
        case SessionType.LONG_BREAK:
          state.secondsRemaining = 15 * 60;
          state.totalSeconds = 15 * 60;
          break;
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

export const { setTimerState, setSessionType, setCurrentTaskId, tick } =
  timerSlice.actions;
export default timerSlice.reducer;
