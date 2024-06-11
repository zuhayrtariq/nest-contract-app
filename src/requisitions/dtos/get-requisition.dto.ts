import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateRequisitionDto } from "./create-requisition.dto";

class OmitCreateRequisitionDto extends OmitType(CreateRequisitionDto,['notes','reqACV','reqCurrency','vendorName','title','reqNo','reqDate'])
{

}

export class getRequisitionDto extends PartialType(OmitCreateRequisitionDto)
{
    
}