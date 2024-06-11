import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { CallOffsService } from './call-offs.service';
import { GetCallOffDto } from './dtos/get-call-off.dto';
import { AdminAuthGuard } from 'src/guards/adminAuth.guard';
import { UpdateCallOffDto } from './dtos/update-call-off';

@Controller('call-offs')
export class CallOffsController {

  constructor(private readonly coffService: CallOffsService) {

  }

  @Get('')
  getAll(@Query() query: GetCallOffDto) {
    return this.coffService.getAll(query)
  }
  @Get('/validity')
  async getCallOffByValidity(@Query('sectionCode') sectionCode?:string)
  {
    return this.coffService.getCallOffByValidity(sectionCode)
  }

  @Get('/validity/ses')
  async getCallOffBySESValidity(@Query('sectionCode') sectionCode?:string)
  {
    return this.coffService.getCallOffBySESValidity(sectionCode)
  }

  @Get(':coffNo')
  async getOne(@Param('coffNo') coffNo: number) {
    return this.coffService.getOne(coffNo)
  }

  @Patch(':coffNo')
  async update(@Param('coffNo') coffNo: number,@Body() updateCoffDto: UpdateCallOffDto) {
    return this.coffService.update(coffNo,updateCoffDto)
  }

  @Delete(':coffNo')
  @UseGuards(AdminAuthGuard)
  async deleteCallOff(@Param('coffNo') coffNo: number) {
    return this.coffService.deleteCallOff(coffNo)
  }
}
