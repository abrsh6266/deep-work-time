"use client";

import SessionHistory from "@/components/history/SessionHistory";

export default function TasksPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Session History</h2>
        <p className="text-gray-500 text-sm">
          Review all your past focus sessions.
        </p>
        <SessionHistory />
      </div>
    </div>
  );
}
