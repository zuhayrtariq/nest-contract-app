import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateSectionDto } from './dtos/update-section.dto';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dtos/create-section.dto';

@Controller('sections')
export class SectionsController {

    constructor(private sectionsService : SectionsService)
    {

    }

    @Get()
    getAll()
    {
        return this.sectionsService.getAll()
    }

    @Get(':sectionCode')
    getOne(@Param('sectionCode') sectionCode : string)
    {
        return this.sectionsService.getOne(sectionCode)
    }

    @Patch(':sectionCode')
    update(@Param('sectionCode') sectionCode : string , @Body() updateSectionDto : UpdateSectionDto)
    {
        console.log(updateSectionDto)
        return this.sectionsService.update(sectionCode,updateSectionDto)
    }

    @Post()
    createNew(@Body() createSectionDto : CreateSectionDto)
    {
        return this.sectionsService.createNew(createSectionDto)
    }

    @Delete(':sectionCode')
    deleteSection(@Param('sectionCode') sectionCode : string)
    {
        return this.sectionsService.deleteSection(sectionCode)
    }



    /*
    /sections
    
    */
}
