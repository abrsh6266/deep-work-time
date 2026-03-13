import { IsString, IsOptional, IsBoolean, MaxLength } from "class-validator";

export class CreateBlockItemDto {
  @IsString()
  @MaxLength(255)
  domain!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}