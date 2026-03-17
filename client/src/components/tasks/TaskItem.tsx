"use client";

import { Task, TaskStatus, TaskPriority } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  CheckCircle,
  Circle,
  Trash2,
  Target,
  Clock,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";
import { useTasks } from "@/hooks/useTaks";
import { setSelectedTask } from "@/store/slices/taskSlice";

const priorityColors: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "text-gray-500",
  [TaskPriority.MEDIUM]: "text-blue-500",
  [TaskPriority.HIGH]: "text-orange-500",
  [TaskPriority.URGENT]: "text-red-500",
};

const priorityBgs: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "bg-gray-500/10",
  [TaskPriority.MEDIUM]: "bg-blue-500/10",
  [TaskPriority.HIGH]: "bg-orange-500/10",
  [TaskPriority.URGENT]: "bg-red-500/10",
};

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector(
    (state: RootState) => state.tasks.selectedTaskId,
  );
  const { updateTask, deleteTask } = useTasks();

  const isSelected = selectedTaskId === task.id;
  const isDone = task.status === TaskStatus.DONE;

  const cycleStatus = () => {
    const statusFlow: Record<TaskStatus, TaskStatus> = {
      [TaskStatus.TODO]: TaskStatus.IN_PROGRESS,
      [TaskStatus.IN_PROGRESS]: TaskStatus.DONE,
      [TaskStatus.DONE]: TaskStatus.TODO,
    };
    updateTask({ id: task.id, data: { status: statusFlow[task.status] } });
  };

  return (
    <div
      className={clsx(
        "bg-gray-900 border rounded-xl p-4 transition-all",
        isSelected
          ? "border-blue-500/50 ring-1 ring-blue-500/25"
          : "border-gray-800 hover:border-gray-700",
      )}
    >
      <div className="flex items-start gap-3">
        <button onClick={cycleStatus} className="mt-0.5 shrink-0">
          {isDone ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : task.status === TaskStatus.IN_PROGRESS ? (
            <ArrowRight className="w-5 h-5 text-yellow-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={clsx(
              "text-sm font-medium",
              isDone ? "text-gray-500 line-through" : "text-white",
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-gray-500 text-xs mt-1 truncate">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2">
            <span
              className={clsx(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                priorityColors[task.priority],
                priorityBgs[task.priority],
              )}
            >
              {task.priority}
            </span>

            <span className="text-gray-600 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.completedPomodoros}/{task.estimatedPomodoros}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() =>
              dispatch(setSelectedTask(isSelected ? null : task.id))
            }
            className={clsx(
              "p-1.5 rounded-lg transition-colors",
              isSelected
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-400 hover:bg-gray-800",
            )}
            title="Set as active task"
          >
            <Target className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-gray-800 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
