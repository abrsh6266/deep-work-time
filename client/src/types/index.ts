export enum SessionType {
  FOCUS = "FOCUS",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  secondsRemaining: number;
  totalSeconds: number;
  sessionType: SessionType;
  currentTaskId: string | null;
  pomodorosCompleted: number;
  startedAt: string | null;
}

export interface Session {
  id: string;
  type: SessionType;
  duration: number;
  elapsed: number;
  completed: boolean;
  taskId: string | null;
  task: Task | null;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
}

export interface PaginatedSessions {
  data: Session[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedPromodoros: number;
  completedPromodoros: number;
  sessions: Session[];
  createdAt: string;
  updateddAt: string;
}

export interface blookedSite {
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
}

export interface DailyScore {
  date: string;
  focusMinutes: number;
  sessionCount: number;
  completedSessions: number;
}

export interface WeeklyStat {
  date: string;
  focusMinutes: number;
  sessionsCount: number;
  completedSessions: number;
}

export interface OverallStats {
  totalSessions: number;
  completedSessions: number;
  totaltasks: number;
  totalFocusMinutes: number;
  totalFocusHours: number;
  currentStreak: number;
}
