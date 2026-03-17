"use client";

import StatsDashboard from "@/components/stats/StatsDashboard";

export default function TasksPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Statistics</h2>
        <p className="text-gray-500 text-sm">
          Track your productivity trend and focus metrics.
        </p>
      </div>
      <StatsDashboard />
    </div>
  );
}
