import { SessionType } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateSessionDto {
  @IsEnum(SessionType)
  type!: SessionType;

  @IsInt()
  duration!: number;

  @IsInt()
  elapsed!: number;

  @IsBoolean()
  completed!: boolean;

  @IsOptional()
  @IsString()
  taskId?: string;

  @IsDateString()
  startedAt!: string;
}
