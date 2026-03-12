import { Injectable } from "@nestjs/common";
import { SessionType } from "@prisma/client";

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  secondsRemaining: number;
  totalSeconds: number;
  sessionType: SessionType;
  currentTaskId: string | null;
  pomodorosCompleted: number;
  startedAt: Date | null;
}

@Injectable()
export class TimerService {
  private state: TimerState = {
    isRunning: false,
    isPaused: false,
    secondsRemaining: 25 * 60,
    totalSeconds: 25 * 60,
    sessionType: SessionType.FOCUS,
    currentTaskId: null,
    pomodorosCompleted: 0,
    startedAt: null,
  };

  private intervalId: NodeJS.Timeout | null = null;
  private tickCallback: ((state: TimerState) => void) | null = null;
  private completeCallback: ((state: TimerState) => void) | null = null;

  getState(): TimerState {
    return { ...this.state };
  }

  onTick(callback: (state: TimerState) => void) {
    this.tickCallback = callback;
  }

  onComplete(callback: (state: TimerState) => void) {
    this.completeCallback = callback;
  }

  start(
    sessionType: SessionType = SessionType.FOCUS,
    taskId: string | null = null,
  ): TimerState {
    if (this.state.isRunning && !this.state.isPaused) {
      return this.state;
    }

    if (!this.state.isPaused) {
      const duration = this.getDuration(sessionType);
      this.state = {
        ...this.state,
        isRunning: true,
        isPaused: false,
        secondsRemaining: duration,
        totalSeconds: duration,
        sessionType,
        currentTaskId: taskId,
        startedAt: new Date(),
      };
    } else {
      this.state.isRunning = true;
      this.state.isPaused = false;
    }

    this.clearInterval();
    this.intervalId = setInterval(() => this.tick(), 1000);

    return this.getState();
  }

  pause(): TimerState {
    if (!this.state.isRunning) return this.state;
    this.state.isPaused = true;
    this.state.isRunning = false;
    this.clearInterval();
    return this.getState();
  }

  reset(): TimerState {
    this.clearInterval();
    const duration = this.getDuration(this.state.sessionType);
    this.state = {
      ...this.state,
      isRunning: false,
      isPaused: false,
      secondsRemaining: duration,
      totalSeconds: duration,
      startedAt: null,
    };
    return this.getState();
  }

  stop(): TimerState {
    this.clearInterval();
    this.state = {
      isRunning: false,
      isPaused: false,
      secondsRemaining: 25 * 60,
      totalSeconds: 25 * 60,
      sessionType: SessionType.FOCUS,
      currentTaskId: null,
      pomodorosCompleted: this.state.pomodorosCompleted,
      startedAt: null,
    };
    return this.getState();
  }

  setSessionType(type: SessionType): TimerState {
    if (this.state.isRunning) return this.state;
    const duration = this.getDuration(type);
    this.state = {
      ...this.state,
      sessionType: type,
      secondsRemaining: duration,
      totalSeconds: duration,
    };
    return this.getState();
  }

  private tick() {
    if (this.state.secondsRemaining <= 0) {
      this.complete();
      return;
    }

    this.state.secondsRemaining -= 1;

    if (this.tickCallback) {
      this.tickCallback(this.getState());
    }
  }

  private complete() {
    this.clearInterval();

    if (this.state.sessionType === SessionType.FOCUS) {
      this.state.pomodorosCompleted += 1;
    }

    const completedState = this.getState();

    this.state.isRunning = false;
    this.state.isPaused = false;
    this.state.secondsRemaining = 0;

    if (this.completeCallback) {
      this.completeCallback(completedState);
    }
  }

  private getDuration(type: SessionType): number {
    switch (type) {
      case SessionType.FOCUS:
        return 25 * 60;
      case SessionType.SHORT_BREAK:
        return 5 * 60;
      case SessionType.LONG_BREAK:
        return 15 * 60;
      default:
        return 25 * 60;
    }
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
