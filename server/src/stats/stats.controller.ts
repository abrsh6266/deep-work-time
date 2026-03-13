import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";

@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("daily-score")
  getDailyScore(@Query("date") date?: string) {
    return this.statsService.getDailyScore(date);
  }

  @Get("weekly")
  getWeeklyStats() {
    return this.statsService.getWeeklyStats();
  }

  @Get("overall")
  getOverallStats() {
    return this.statsService.getOverallStats();
  }
}
