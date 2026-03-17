"use client";

import { useStats } from "@/hooks/useStats";
import FocusScoreCard from "./FocusScoreCard";
import { WeeklyFocusChart, WeeklySessionsChart } from "./Charts";
import { Clock, CheckCircle, Flame, ListChecks, Loader2 } from "lucide-react";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-white text-2xl font-bold">{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function StatsDashboard() {
  const { overallStats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FocusScoreCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          label="Total Focus"
          value={`${overallStats?.totalFocusHours || 0}h`}
          sub={`${overallStats?.totalFocusMinutes || 0} minutes`}
          color="bg-blue-600"
        />
        <StatCard
          icon={CheckCircle}
          label="Sessions"
          value={overallStats?.completedSessions || 0}
          sub={`of ${overallStats?.totalSessions || 0} total`}
          color="bg-green-600"
        />
        <StatCard
          icon={ListChecks}
          label="Tasks Done"
          value={overallStats?.completedTasks || 0}
          sub={`of ${overallStats?.totalTasks || 0} total`}
          color="bg-purple-600"
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${overallStats?.currentStreak || 0} days`}
          sub="Keep it going!"
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyFocusChart />
        <WeeklySessionsChart />
      </div>
    </div>
  );
}
