import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TaskModule } from "./task/task.module";
import { SessionModule } from "./session/session.module";
import { TimerModule } from "./timer/timer.module";

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    SessionModule,
    TimerModule,
  ],
})
export class AppModule {}
