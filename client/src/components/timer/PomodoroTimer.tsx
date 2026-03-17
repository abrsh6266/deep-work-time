"use client";

import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { TaskStatus } from "@/types";
import { Target, X } from "lucide-react";
import { useTasks } from "@/hooks/useTaks";
import { setSelectedTask } from "@/store/slices/taskSlice";

export default function PomodoroTimer() {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector(
    (state: RootState) => state.tasks.selectedTaskId,
  );
  const { tasks } = useTasks();

  const activeTasks = tasks.filter((t) => t.status !== TaskStatus.DONE);
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <div className="flex flex-col items-center gap-8">
      <TimerDisplay />
      <TimerControls />

      {/* Task selector */}
      <div className="w-full max-w-sm">
        {selectedTask ? (
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
            <Target className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-white text-sm truncate flex-1">
              {selectedTask.title}
            </span>
            <button
              onClick={() => dispatch(setSelectedTask(null))}
              className="text-gray-500 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <label className="text-gray-500 text-xs block mb-2 text-center">
              Link a task to this session
            </label>
            <select
              value=""
              onChange={(e) =>
                dispatch(setSelectedTask(e.target.value || null))
              }
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option value="">Select a task (optional)</option>
              {activeTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
