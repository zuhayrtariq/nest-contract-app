import { OmitType } from "@nestjs/mapped-types";
import { CreateContractDto } from "./create-contract.dto";
import { IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min } from "class-validator";

export class UpdateContractDto
{
    @IsString()
    @MaxLength(75)
    @IsOptional()
    title?: string

    @IsString()
    @MaxLength(50)
    @IsOptional()
    vendorName?: string

        
    @IsString()
    @IsOptional()
    notes? : string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    reqNo ?: number;

    @IsOptional()
    @IsNumber()
    @Max(1)
    @Min(0)
    archived?: number;

    @IsOptional()
    @IsNumber()
    @Max(1)
    @Min(0)
    emailAlerts?: number;

}