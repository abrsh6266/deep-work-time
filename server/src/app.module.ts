import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TaskModule } from "./task/task.module";
import { SessionModule } from "./session/session.module";
import { TimerModule } from "./timer/timer.module";
import { StatsModule } from "./stats/stats.module";
import { BlocklistModule } from "./blocklist/blocklist.module";

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    SessionModule,
    TimerModule,
    StatsModule,
    BlocklistModule,
  ],
})
export class AppModule {}
