import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { TimerService } from "./timer.service";

@WebSocketGateway({
  cors: {
    origin: ["http//localhost:3000"],
    credentials: true,
  },
})
export class TimerGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private readonly timerService: TimerService) {}
}
