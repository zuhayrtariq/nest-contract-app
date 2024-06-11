import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { ContractsService } from './contracts.service';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { GetContractDto } from './dtos/get-contract.dto';

@Controller('contracts')
export class ContractsController {

    constructor(private readonly contractsService : ContractsService)
    {

    }
    @Get('/call-off')
    getAllContractsWithCoff(@Query() getContractDto : GetContractDto)
    {
        return this.contractsService.getAllContractsWithCoff(getContractDto)
    }
    @Get('/status')
    getContractByStatus(@Query('sectionCode') sectionCode?: string)
    {
        return this.contractsService.getContractByStatus(sectionCode)
    }

    @Get('/call-off/:contractNo')
    getContractWithCoff(@Param('contractNo') contractNo : number)
    {
        return this.contractsService.getContractWithCoff(contractNo)
    }

    @Get('/validity')
    getContractByValidity(@Query('sectionCode') sectionCode?:string)
    {
        return this.contractsService.getContractByValidity(sectionCode);
    }

    @Get('/value')
    getContractsValue()
    {
        return this.contractsService.getContractsValue();
    }

    @Get(':contractNo')
    getOne(@Param('contractNo') contractNo : number)
    {
        return this.contractsService.getOne(contractNo)
    }
    @Get()
    getAll(@Query() getContractDto : GetContractDto)
    {
        return this.contractsService.getAll(getContractDto);
    }
   
    @Patch(':contractNo')
    update(@Param('contractNo') contractNo : number, @Body() updateContractDto : UpdateContractDto)
    {
        return this.contractsService.update(contractNo,updateContractDto)
    }

    @Delete(':contractNo')
    deleteContract(@Param('contractNo') contractNo : number)
    {
        return this.contractsService.deleteContract(contractNo);
    }

}
