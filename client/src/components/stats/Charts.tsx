"use client";

import { useStats } from "@/hooks/useStats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export function WeeklyFocusChart() {
  const { weeklyStats } = useStats();

  const chartData = weeklyStats.map((stat) => ({
    date: new Date(stat.date).toLocaleDateString("en-US", { weekday: "short" }),
    minutes: stat.focusMinutes,
    sessions: stat.completedSessions,
  }));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Weekly Focus Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value} min`, "Focus"]}
            />
            <Bar
              dataKey="minutes"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WeeklySessionsChart() {
  const { weeklyStats } = useStats();

  const chartData = weeklyStats.map((stat) => ({
    date: new Date(stat.date).toLocaleDateString("en-US", { weekday: "short" }),
    sessions: stat.completedSessions,
    total: stat.sessionsCount,
  }));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Sessions This Week</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", r: 4 }}
              name="Completed"
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#6b7280", r: 3 }}
              name="Total"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
