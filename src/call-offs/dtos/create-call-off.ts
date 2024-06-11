import { IsDateString, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";


export class CreateCallOffDto{
    
    // @IsNumber()
    // contract : Contract;

    @IsNumber()
    @IsPositive()
    coffNo : number;
    
    @IsString()
    @MaxLength(75)
    title : string;

    @IsDateString()
    @MaxLength(10)
    startDate : string;

    @IsDateString()
    @MaxLength(10)
    endDate : string;

    @IsDateString()
    @MaxLength(10)
    sesEndDate : string;

    
    @IsNumber()
    @IsPositive()
    amountToBeInvoiced : number;

    @IsNumber()
    @IsPositive()
    amountToBeDelivered : number;

    @IsString()
    @MaxLength(5)
    coffCurrency : string;

    @IsNumber()
    @IsPositive()
    coffAmount : number;

    @IsString()
    @IsOptional()
    notes? : string;

}