import { OmitType } from '@nestjs/mapped-types';
import { CreateCallOffDto } from './create-call-off';
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateCallOffDto {
  @IsString()
  @MaxLength(75)
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  archived : number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  emailAlerts : number;

  @IsString()
  @IsOptional()
  notes?: string;

}
