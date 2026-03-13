import { Module } from "@nestjs/common";
import { SessionModule } from "../session/session.module";
import { TimerController } from "./timer.controller";
import { TimerGateway } from "./timer.gateway";
import { TimerService } from "./timer.service";

@Module({
  imports: [SessionModule],
  controllers: [TimerController],
  providers: [TimerGateway, TimerService],
  exports: [TimerService],
})
export class TimerModule {}
