import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateSectionDto } from "./create-section.dto";

class OmitCreateSectionDto extends OmitType(CreateSectionDto,['sectionCode']as const){

}

export class UpdateSectionDto extends PartialType(OmitCreateSectionDto)
{

}