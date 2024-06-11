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

export class GetContractDto {
    @IsString()
    @IsAlpha()
    @IsOptional()
    sectionCode?: string;

  
    @IsNumber()
    @IsOptional()
    vendorCode?: number;


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
    @MaxLength(5)
    contractCurrency?: string;
}
