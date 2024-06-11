import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query } from '@nestjs/common';
import { RequisitionsService } from './requisitions.service';
import { CreateRequisitionDto } from './dtos/create-requisition.dto';
import { UpdateRequisitionDto } from './dtos/update-requisition.dto';
import { getRequisitionDto } from './dtos/get-requisition.dto';

@Controller('requisitions')
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) { }

  @Get()
  getAll(@Query() getRequisitionDto: getRequisitionDto) {
    return this.requisitionsService.getAll(getRequisitionDto);
  }

  @Get(':reqNo')
  getOne(@Param('reqNo') reqNo: number) {
    return this.requisitionsService.getOne(reqNo);
  }

  @Post()
  create(@Body() createRequisitionDto: CreateRequisitionDto) {
    return this.requisitionsService.create(createRequisitionDto);
  }

  @Post('/bulk')
  createMany(@Body(new ParseArrayPipe({ items: CreateRequisitionDto })) createRequisitionDto: CreateRequisitionDto[]) {
    return this.requisitionsService.createMany(createRequisitionDto);
  }

  @Delete(':reqNo')
  deleteRequisition(@Param('reqNo') reqNo: number) {
    return this.requisitionsService.deleteRequisition(reqNo)
  }

  @Patch(":reqNo")
  update(@Param('reqNo') reqNo: number, @Body() updateRequisitionDto: UpdateRequisitionDto) {
    return this.requisitionsService.update(reqNo, updateRequisitionDto)
  }
}
