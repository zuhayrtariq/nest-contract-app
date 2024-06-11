import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateRequisitionDto } from "./create-requisition.dto";

class OmitCreateRequisitionDto extends OmitType(CreateRequisitionDto,['reqNo'] as const)
{

}

export class UpdateRequisitionDto extends PartialType(OmitCreateRequisitionDto){
    
}