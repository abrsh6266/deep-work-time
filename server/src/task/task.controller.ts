import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "@prisma/client";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Get()
  findAll(@Query("status") status?: TaskStatus) {
    return this.taskService.findAll(status);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.taskService.delete(id);
  }
  @Patch(":id/increment-promodoro")
  increment(@Param("id") id: string) {
    return this.taskService.incrementPomodoro(id);
  }
}
