import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskStatus } from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        estimatedPomodoros: dto.estimatedPomodoros,
      },
      include: { sessions: true },
    });
  }

  async findAll(status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: status ? { status } : undefined,
      orderBy: [{ status: "asc" }, { priority: "desc" }, { createdAt: "desc" }],
      include: {
        sessions: {
          orderBy: { startedAt: "desc" },
          take: 5,
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { sessions: { orderBy: { startedAt: "desc" } } },
    });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: dto,
      include: { sessions: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }

  async incrementPomodoro(id: string) {
    return this.prisma.task.update({
      where: { id },
      data: { completedPomodoros: { increment: 1 } },
    });
  }
}
