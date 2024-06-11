import {  IsNumber, IsOptional, IsPositive, IsString, Max, } from "class-validator";


export class CreateContractDto{

    @IsNumber()
    @IsPositive()
    contractNo : number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    reqNo?: number;

    @IsString()
    @Max(75)
    title : string


    @IsString()
    @Max(5)
    sectionCode : string

    @IsNumber()
    @IsPositive()
    vendorCode : number

    @IsString()
    @Max(50)
    vendorName : string


    @IsString()
    @Max(10)
    startDate : string

    @IsString()
    @Max(10)
    endDate : string

    @IsNumber()
    @IsPositive()
    contractTRXValue : number

    @IsNumber()
    @IsPositive()
    contractOpenValue : number

    @IsString()
    @Max(5)
    contractCurrency : string

    
    @IsString()
    @IsOptional()
    notes? : string

}