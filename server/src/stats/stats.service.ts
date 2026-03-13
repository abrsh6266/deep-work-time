import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SessionType, TaskStatus } from "@prisma/client";

interface DailyStatsResult {
  date: string;
  focusMinutes: number;
  sessionsCount: number;
  completedSessions: number;
}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDailyScore(date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const sessions = await this.prisma.session.findMany({
      where: {
        startedAt: { gte: startOfDay, lte: endOfDay },
        type: SessionType.FOCUS,
      },
    });

    const completedTasks = await this.prisma.task.count({
      where: {
        status: TaskStatus.DONE,
        updatedAt: { gte: startOfDay, lte: endOfDay },
      },
    });

    const totalFocusSeconds = sessions.reduce((acc, s) => acc + s.elapsed, 0);
    const focusMinutes = Math.round(totalFocusSeconds / 60);
    const completedSessions = sessions.filter((s) => s.completed).length;
    const totalSessions = sessions.length;

    // Score calculation: max 100
    // 40% from focus time (target: 4 hours = 240 min)
    // 30% from completed sessions (target: 8 sessions)
    // 30% from completed tasks (target: 5 tasks)
    const focusScore = Math.min((focusMinutes / 240) * 40, 40);
    const sessionScore = Math.min((completedSessions / 8) * 30, 30);
    const taskScore = Math.min((completedTasks / 5) * 30, 30);
    const score = Math.round(focusScore + sessionScore + taskScore);

    return {
      date: startOfDay.toISOString().split("T")[0],
      focusMinutes,
      sessionsCount: totalSessions,
      completedSessions,
      completedTasks,
      score,
    };
  }

  async getWeeklyStats() {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const sessions = await this.prisma.session.findMany({
      where: {
        startedAt: { gte: sevenDaysAgo },
        type: SessionType.FOCUS,
      },
      orderBy: { startedAt: "asc" },
    });

    const dailyMap = new Map<string, DailyStatsResult>();

    // Initialize all 7 days
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      dailyMap.set(key, {
        date: key,
        focusMinutes: 0,
        sessionsCount: 0,
        completedSessions: 0,
      });
    }

    for (const session of sessions) {
      const key = session.startedAt.toISOString().split("T")[0];
      const entry = dailyMap.get(key);
      if (entry) {
        entry.focusMinutes += Math.round(session.elapsed / 60);
        entry.sessionsCount += 1;
        if (session.completed) entry.completedSessions += 1;
      }
    }

    return Array.from(dailyMap.values());
  }

  async getOverallStats() {
    const totalSessions = await this.prisma.session.count({
      where: { type: SessionType.FOCUS },
    });

    const completedSessions = await this.prisma.session.count({
      where: { type: SessionType.FOCUS, completed: true },
    });

    const totalTasks = await this.prisma.task.count();
    const completedTasks = await this.prisma.task.count({
      where: { status: TaskStatus.DONE },
    });

    const focusResult = await this.prisma.session.aggregate({
      _sum: { elapsed: true },
      where: { type: SessionType.FOCUS },
    });

    const totalFocusMinutes = Math.round((focusResult._sum.elapsed || 0) / 60);

    // Calculate streak
    const streak = await this.calculateStreak();

    return {
      totalSessions,
      completedSessions,
      totalTasks,
      completedTasks,
      totalFocusMinutes,
      totalFocusHours: Math.round((totalFocusMinutes / 60) * 10) / 10,
      currentStreak: streak,
    };
  }

  private async calculateStreak(): Promise<number> {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const endOfCheck = new Date(checkDate);
      endOfCheck.setHours(23, 59, 59, 999);

      const count = await this.prisma.session.count({
        where: {
          type: SessionType.FOCUS,
          completed: true,
          startedAt: { gte: checkDate, lte: endOfCheck },
        },
      });

      if (count > 0) {
        streak++;
      } else if (i > 0) {
        break;
      } else {
        // Today has no sessions yet, check from yesterday
        continue;
      }
    }

    return streak;
  }
}
