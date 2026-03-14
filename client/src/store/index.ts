import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice";
import taskReducer from "./slices/taskSlice";
import blocklistReducer from "./slices/blocklistSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: taskReducer,
    blocklist: blocklistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
