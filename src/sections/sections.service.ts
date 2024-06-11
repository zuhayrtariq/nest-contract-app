import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { UpdateSectionDto } from './dtos/update-section.dto';
import { CreateSectionDto } from './dtos/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
  ) {}

  getAll() {
    return this.sectionRepo.find();
  }
  getOne(sectionCode: string) {
    return this.sectionRepo.findOneBy({ sectionCode });
  }
 async getAllSectionCodes()
  {
    const sectionCodes = await this.sectionRepo.createQueryBuilder('section').select('section.sectionCode').getMany()
    return sectionCodes.map(x =>x.sectionCode)
  }

  async update(sectionCode: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.getOne(sectionCode);
    if (!section)
      throw new NotFoundException(`Section Not Found : ${sectionCode}`);
    Object.assign(section, updateSectionDto);
    return this.sectionRepo.save(section);
  }

  async createNew(createSectionDto: CreateSectionDto) {
    const { sectionCode } = createSectionDto;
    const section = await this.getOne(sectionCode);
    if (section)
      throw new HttpException(`Section Already Exists : ${sectionCode}`, 409);
    const newSection = this.sectionRepo.create(createSectionDto);
    return this.sectionRepo.save(newSection);
  }

  async deleteSection(sectionCode : string) {
    const section = await this.getOne(sectionCode);
    if (!section)
      throw new NotFoundException(`Section Does Not Exist : ${sectionCode}`);
    return this.sectionRepo.delete(sectionCode);
  }
}
