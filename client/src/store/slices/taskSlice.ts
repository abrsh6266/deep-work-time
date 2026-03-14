import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

interface TaskState {
  selectedTaskId: string | null;
  tasks: Task[];
}

const initialState: TaskState = {
  selectedTaskId: null,
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { setSelectedTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
