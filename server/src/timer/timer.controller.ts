import { Controller, Get } from "@nestjs/common";
import { TimerService } from "./timer.service";

@Controller("timer")
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Get("state")
  getState() {
    return this.timerService.getState();
  }
}
