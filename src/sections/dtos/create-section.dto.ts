import { IsAlpha, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSectionDto{

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(5)
    sectionCode : string;

    @IsString()
    @MaxLength(50)
    sectionHeadName : string;

    @IsEmail()
    sectionHeadEmail : string;
}