import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Requisition } from './requisition.entity';
import { Repository } from 'typeorm';
import { CreateRequisitionDto } from './dtos/create-requisition.dto';
import { UpdateRequisitionDto } from './dtos/update-requisition.dto';
import { getRequisitionDto } from './dtos/get-requisition.dto';


@Injectable()
export class RequisitionsService {
  constructor(
    @InjectRepository(Requisition)
    private readonly requisitionRepo: Repository<Requisition>,
  ) {}

  getOne(reqNo: number) {
    return this.requisitionRepo.findOneBy({ reqNo });
  }

  getAll(dto : getRequisitionDto) {
    const {archived,buyerName,emailAlerts,sectionCode,reqType} = dto;
    const queryBuilder = this.requisitionRepo.createQueryBuilder('r');
    archived && queryBuilder.andWhere('r.archived = :archived',{archived})
    buyerName && queryBuilder.andWhere('r.buyerName = :buyerName',{buyerName})
    emailAlerts && queryBuilder.andWhere('r.emailAlerts = :emailAlerts',{emailAlerts})
    sectionCode && queryBuilder.andWhere('r.sectionCode = :sectionCode',{sectionCode})
    reqType && queryBuilder.andWhere('r.reqType = :reqType',{reqType})
    return queryBuilder.getMany();
  }

  async create(createRequisitionDto: CreateRequisitionDto) {
    const { reqNo } = createRequisitionDto;
    const requisition = await this.getOne(reqNo);
    if (requisition)
      throw new HttpException(`Requisition Already Exists : ${reqNo}`, 409);
    const newRequisition = this.requisitionRepo.create(createRequisitionDto);
    return this.requisitionRepo.save(newRequisition);
  }

  async createMany(createRequisitionDto: CreateRequisitionDto[]) {

    return this.requisitionRepo
      .createQueryBuilder()
      .insert()
      .into(Requisition)
      .values(createRequisitionDto)
      .execute();
  }

  async update(reqNo: number,updateRequisitionDto: UpdateRequisitionDto) {

    const requisition = await this.getOne(reqNo);
    if(!requisition)
        throw new NotFoundException(`Requisition Not Found : ${reqNo}`);
    Object.assign(requisition,updateRequisitionDto);
    return this.requisitionRepo.save(requisition);
  }

 async deleteRequisition(reqNo: number) {
    const requisition = await this.getOne(reqNo);
    if(!requisition)
        throw new NotFoundException(`Requisition Dotes Not Exist: ${reqNo}`);
    return this.requisitionRepo.delete(reqNo);
 }
 
 async getTotal(dto : getRequisitionDto) {
  const {archived,buyerName,emailAlerts,sectionCode,reqType} = dto;
  const queryBuilder = this.requisitionRepo.createQueryBuilder('r');
  archived && queryBuilder.andWhere('r.archived = :archived',{archived})
  buyerName && queryBuilder.andWhere('r.buyerName = :buyerName',{buyerName})
  emailAlerts && queryBuilder.andWhere('r.emailAlerts = :emailAlerts',{emailAlerts})
  sectionCode && queryBuilder.andWhere('r.sectionCode = :sectionCode',{sectionCode})
  reqType && queryBuilder.andWhere('r.reqType = :reqType',{reqType})
  return queryBuilder.getCount();
}
}
