"use client";

import { useState } from "react";
import { TaskPriority } from "@/types";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTaks";

export default function TaskForm() {
  const { createTask, isCreating } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        estimatedPomodoros,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setPriority(TaskPriority.MEDIUM);
          setEstimatedPomodoros(1);
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
    >
      <h3 className="text-white font-semibold mb-4">Add New Task</h3>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-500 text-xs block mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value={TaskPriority.LOW}>Low</option>
              <option value={TaskPriority.MEDIUM}>Medium</option>
              <option value={TaskPriority.HIGH}>High</option>
              <option value={TaskPriority.URGENT}>Urgent</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-gray-500 text-xs block mb-1">
              Est. Pomodoros
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={estimatedPomodoros}
              onChange={(e) =>
                setEstimatedPomodoros(parseInt(e.target.value) || 1)
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isCreating || !title.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isCreating ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
