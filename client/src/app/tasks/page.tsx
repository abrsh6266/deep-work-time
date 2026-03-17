"use client";

import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";

export default function TasksPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Tasks</h2>
        <p className="text-gray-500 text-sm">
          Manage your Tasks and link them to focus sessions.
        </p>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
