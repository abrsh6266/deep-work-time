import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TimerService, TimerState } from "./timer.service";
import { SessionService } from "../session/session.service";
import { SessionType } from "@prisma/client";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
})
export class TimerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly timerService: TimerService,
    private readonly sessionService: SessionService,
  ) {}

  afterInit() {
    this.timerService.onTick((state: TimerState) => {
      this.server.emit("timer:tick", state);
    });

    this.timerService.onComplete(async (state: TimerState) => {
      // Save completed session
      await this.sessionService.create({
        type: state.sessionType,
        duration: state.totalSeconds,
        elapsed: state.totalSeconds,
        completed: true,
        taskId: state.currentTaskId || undefined,
        startedAt: state.startedAt?.toISOString() || new Date().toISOString(),
      });

      this.server.emit("timer:complete", state);
    });

    console.log("Timer WebSocket Gateway initialized");
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Send current state to newly connected client
    client.emit("timer:state", this.timerService.getState());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("timer:start")
  handleStart(
    @MessageBody()
    data: {
      sessionType?: SessionType;
      taskId?: string | null;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const state = this.timerService.start(
      data?.sessionType || SessionType.FOCUS,
      data?.taskId || null,
    );
    this.server.emit("timer:state", state);
    return state;
  }

  @SubscribeMessage("timer:pause")
  handlePause() {
    const state = this.timerService.pause();
    this.server.emit("timer:state", state);
    return state;
  }

  @SubscribeMessage("timer:reset")
  handleReset() {
    const state = this.timerService.reset();
    this.server.emit("timer:state", state);
    return state;
  }

  @SubscribeMessage("timer:stop")
  async handleStop() {
    const currentState = this.timerService.getState();

    // Save partial session if it was running
    if (currentState.startedAt) {
      const elapsed = currentState.totalSeconds - currentState.secondsRemaining;
      if (elapsed > 0) {
        await this.sessionService.create({
          type: currentState.sessionType,
          duration: currentState.totalSeconds,
          elapsed,
          completed: false,
          taskId: currentState.currentTaskId || undefined,
          startedAt: currentState.startedAt.toISOString(),
        });
      }
    }

    const state = this.timerService.stop();
    this.server.emit("timer:state", state);
    return state;
  }

  @SubscribeMessage("timer:setType")
  handleSetType(@MessageBody() data: { sessionType: SessionType }) {
    const state = this.timerService.setSessionType(data.sessionType);
    this.server.emit("timer:state", state);
    return state;
  }

  @SubscribeMessage("timer:getState")
  handleGetState() {
    return this.timerService.getState();
  }
}
