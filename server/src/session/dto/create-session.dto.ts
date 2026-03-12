import {
  IsEnum,
  IsInt,
  IsBoolean,
  IsOptional,
  IsString,
  IsDateString,
} from "class-validator";
import { SessionType } from "@prisma/client";

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
