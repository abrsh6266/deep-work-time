import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSessionDto } from "./dto/create-session.dto";

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto) {
    return this.prisma.session.create({
      data: {
        type: dto.type,
        duration: dto.duration,
        elapsed: dto.elapsed,
        completed: dto.completed,
        taskId: dto.taskId || null,
        startedAt: new Date(dto.startedAt),
        endedAt: new Date(),
      },
      include: { task: true },
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      this.prisma.session.findMany({
        skip,
        take: limit,
        orderBy: { startedAt: "desc" },
        include: { task: true },
      }),
      this.prisma.session.count(),
    ]);

    return {
      data: sessions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByDate(date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.session.findMany({
      where: {
        startedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { startedAt: "desc" },
      include: { task: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.session.findUnique({
      where: { id },
      include: { task: true },
    });
  }

  async delete(id: string) {
    return this.prisma.session.delete({ where: { id } });
  }
}
