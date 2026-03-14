import { Task } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  selectedTaskId: string | null;
  tasks: Task[];
}
const initialState: TaskState = {
  selectedTaskId: null,
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
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
