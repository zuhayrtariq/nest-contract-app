import {
  IsAlpha,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class GetCallOffDto {
  @IsString()
  @IsAlpha()
  @IsOptional()
  sectionCode?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  contractNo?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  archived?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  emailAlerts?: number;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  endDateGT?: string;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  endDateLT?: string;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  startDateGT?: string;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  startDateLT?: string;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  sesEndDateGT?: string;

  @IsString()
  @IsOptional()
  @Length(10, 10)
  sesEndDateLT?: string;

  @IsString()
  @IsOptional()
  @MaxLength(5)
  coffCurrency?: string;
}
