import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { BlocklistService } from "./blocklist.service";
import { CreateBlockItemDto } from "./dto/create-block-item.dto";

@Controller("blocklist")
export class BlocklistController {
  constructor(private readonly blocklistService: BlocklistService) {}

  @Post()
  create(@Body() dto: CreateBlockItemDto) {
    return this.blocklistService.create(dto);
  }

  @Get()
  findAll() {
    return this.blocklistService.findAll();
  }

  @Patch(":id/toggle")
  toggle(@Param("id") id: string) {
    return this.blocklistService.toggle(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.blocklistService.delete(id);
  }
}
