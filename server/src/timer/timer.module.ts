import { Module } from "@nestjs/common";
import { SessionService } from "../session/session.service";
import { TimerController } from "./timer.controller";
import { TimerGateway } from "./timer.gateway";
import { TimerService } from "./timer.service";

@Module({
  imports: [SessionService],
  controllers: [TimerController],
  providers: [TimerGateway, TimerService],
  exports: [TimerService],
})
export class TimerModule {}
