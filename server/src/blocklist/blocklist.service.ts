import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBlockItemDto } from "./dto/create-block-item.dto";

@Injectable()
export class BlocklistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBlockItemDto) {
    const existing = await this.prisma.blockedSite.findUnique({
      where: { domain: dto.domain },
    });
    if (existing) {
      throw new ConflictException(`Domain "${dto.domain}" is already blocked`);
    }
    return this.prisma.blockedSite.create({
      data: {
        domain: dto.domain,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.blockedSite.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async toggle(id: string) {
    const item = await this.prisma.blockedSite.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Block item ${id} not found`);
    return this.prisma.blockedSite.update({
      where: { id },
      data: { isActive: !item.isActive },
    });
  }

  async delete(id: string) {
    const item = await this.prisma.blockedSite.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Block item ${id} not found`);
    return this.prisma.blockedSite.delete({ where: { id } });
  }
}
