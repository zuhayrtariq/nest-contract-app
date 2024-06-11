import {
  IsAlpha,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRequisitionDto{
  @IsNumber()
  @IsPositive()
  reqNo: number;

  @IsString()
  @MaxLength(5)
  @IsAlpha()
  sectionCode: string;

  @IsString()
  @MaxLength(75)
  title: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  vendorName?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  buyerName?: string;

  @IsNumber()
  @IsPositive()
  reqACV: number;

  @IsString()
  @MaxLength(50)
  reqType: string;

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

  @MaxLength(10)
  @IsString()
  reqDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(5)
  @IsAlpha()
  reqCurrency?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
