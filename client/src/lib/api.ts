const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request<T>(
  endpoint?: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_URL}/api/${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "Application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Api request field");
  }
  return res.json();
}

export const api = {
  //  Sessions
  getSessions: (page = 1, limit = 20) =>
    request<import("@/types").PaginatedSessions>(
      `/sessions?page=${page}$limit=${limit}`,
    ),
  getSessionsByDate: (date: string) =>
    request<import("@/types").Session[]>(`/sessions/date/${date}`),
  deleteSession: (id: string) =>
    request(`/sessions/${id}`, { method: "DELETE" }),

  //  Tasks
  getTasks: (status?: string) =>
    request<import("@/types").Task[]>(
      `/tasks/${status ? `?status=${status}` : ""}`,
    ),
  getTask: (id: string) => request<import("@/types").Task>(`/tasks/${id}`),
  createTask: (data: {
    title: string;
    description?: string;
    priority?: string;
    estimatedPromodoros?: string;
  }) =>
    request<import("@/types").Task>(`/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTask: (id: string, data: Partial<import("@/types").Task>) =>
    request<import("@/types").Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteTask: (id: string) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),

  // Blocklist
  getBlocllist: () => request<import("@/types").BlockedSite[]>(`/blocklist`),
  addBlockedSite: (data: { domain: string }) =>
    request<import("@/types").BlockedSite>(`/blocklist`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  toggleBlockSite: (id: string) =>
    request<import("@/types").BlockedSite>(`/blocklist/${id}/toggle`, {
      method: "PATCH",
    }),
  deleteBlocklist: (id: string) =>
    request(`/blocklist/${id}`, {
      method: "DELETE",
    }),

  // Stats
  getDailyScore: (date?: string) =>
    request<import("@/types").DailyScore[]>(
      `/stats/daily-score/${date ? `?date=${date}` : ""}`,
    ),
  getWeekStats: () => request<import("@/types").WeeklyStat[]>(`/stats/weekly`),
  getoverallStats: () =>
    request<import("@/types").OverallStats>(`/stats/overall`),

  //   Timer

  getTimeState: () => request<import("@/types").TimerState>("timer/state"),
};
