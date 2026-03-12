import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { SessionService } from "./session.service";
import { CreateSessionDto } from "./dto/create-session.dto";

@Controller("sessions")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.create(dto);
  }

  @Get()
  findAll(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.sessionService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get("date/:date")
  findByDate(@Param("date") date: string) {
    return this.sessionService.findByDate(date);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sessionService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.sessionService.delete(id);
  }
}
