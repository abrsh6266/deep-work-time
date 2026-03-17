"use client";

import { useState } from "react";
import { useSessions } from "@/hooks/useSessions";
import { SessionType } from "@/types";
import {
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import clsx from "clsx";

const sessionTypeLabels: Record<SessionType, string> = {
  [SessionType.FOCUS]: "Focus",
  [SessionType.SHORT_BREAK]: "Short Break",
  [SessionType.LONG_BREAK]: "Long Break",
};

const sessionTypeColors: Record<SessionType, string> = {
  [SessionType.FOCUS]: "bg-blue-500/10 text-blue-400",
  [SessionType.SHORT_BREAK]: "bg-green-500/10 text-green-400",
  [SessionType.LONG_BREAK]: "bg-purple-500/10 text-purple-400",
};

export default function SessionHistory() {
  const [page, setPage] = useState(1);
  const { sessions, totalPages, isLoading, deleteSession } = useSessions(page);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-700 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">
          No sessions recorded yet. Start your first Pomodoro!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="shrink-0">
              {session.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={clsx(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    sessionTypeColors[session.type],
                  )}
                >
                  {sessionTypeLabels[session.type]}
                </span>
                {session.task && (
                  <span className="text-gray-500 text-xs truncate">
                    • {session.task.title}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs">
                {formatDate(session.startedAt)} —{" "}
                {formatDuration(session.elapsed)} /{" "}
                {formatDuration(session.duration)}
              </p>
            </div>

            <button
              onClick={() => deleteSession(session.id)}
              className="shrink-0 p-2 text-gray-600 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-400 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
