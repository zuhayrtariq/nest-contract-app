import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCallOffDto } from './dtos/update-call-off';
import { InjectRepository } from '@nestjs/typeorm';
import { CallOff } from './call-off.entity';
import { Repository } from 'typeorm';
import { GetCallOffDto } from './dtos/get-call-off.dto';
import * as moment from 'moment';

@Injectable()
export class CallOffsService {
  constructor(
    @InjectRepository(CallOff) private readonly coffRepo: Repository<CallOff>,
  ) {}

  async getAll(dto: GetCallOffDto) {
    const {
      coffCurrency,
      sectionCode,
      contractNo,
      archived,
      emailAlerts,
      endDateGT,
      endDateLT,
      startDateGT,
      startDateLT,
      sesEndDateGT,
      sesEndDateLT,
    } = dto;
    const queryBuilder = this.coffRepo.createQueryBuilder('callOff');
    coffCurrency &&
      queryBuilder.andWhere('callOff.coffCurrency = :coffCurrency', {
        coffCurrency,
      });
    sectionCode &&
      queryBuilder.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });

    contractNo &&
      queryBuilder.andWhere('contract.contractNo = :contractNo', {
        contractNo,
      });

      archived &&
      queryBuilder.andWhere('callOff.archived = :archived', {
        archived,
      });
      emailAlerts &&
      queryBuilder.andWhere('callOff.emailAlerts = :emailAlerts', {
        emailAlerts,
      });

      archived &&
      queryBuilder.andWhere('callOff.archived = :archived', {
        archived,
      });

      startDateLT &&
      queryBuilder.andWhere('callOff.startDate <= :startDateLT', {
        startDateLT,
      });
      startDateGT &&
      queryBuilder.andWhere('callOff.startDate >= :startDateGT', {
        startDateGT,
      });
      endDateLT &&
      queryBuilder.andWhere('callOff.endDate <= :endDateLT', {
        endDateLT,
      });
      endDateGT &&
      queryBuilder.andWhere('callOff.endDate >= :endDateGT', {
        endDateGT,
      });
      sesEndDateLT &&
      queryBuilder.andWhere('callOff.sesEndDate <= :sesEndDateLT', {
        sesEndDateLT,
      });

      sesEndDateGT &&
      queryBuilder.andWhere('callOff.sesEndDate >= :sesEndDateGT', {
        sesEndDateGT,
      });

    return queryBuilder
      .leftJoin('callOff.contract', 'contract')
      .addSelect([
        'contract.sectionCode',
        'contract.vendorName',
        'contract.vendorCode',
      ])
      .getMany();
  }

  async getOne(coffNo: number) {
    const queryBuilder = this.coffRepo.createQueryBuilder('callOff');
    return queryBuilder
      .leftJoin('callOff.contract', 'contract')
      .addSelect([
        'contract.sectionCode',
        'contract.vendorName',
        'contract.vendorCode',
      ])
      .where('callOff.coffNo = :coffNo', { coffNo })
      .getOne();
  }

  async update(coffNo: number, updateCoffDto: UpdateCallOffDto) {
  
    const callOff = await this.getOne(coffNo)
    if(!callOff)
      throw new NotFoundException(`Call-off Not Found : ${coffNo}`);
    Object.assign(callOff,updateCoffDto);
    return this.coffRepo.save(callOff);

  }

  async deleteCallOff(coffNo: number) {}

  async getCallOffByValidity(sectionCode?: string) {
    const callOffsExpiring = this.coffRepo.createQueryBuilder('callOff');
    const callOffsExpired = this.coffRepo.createQueryBuilder('callOff');

    const callOffsActive = this.coffRepo.createQueryBuilder('callOff');

    const expiringSoonDate = moment().add(20, 'days').format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');
 
    callOffsExpiring.where('callOff.endDate <= :expiringSoonDate', {
      expiringSoonDate,
    });

    callOffsExpired.where('callOff.endDate <= :todayDate', { todayDate });

    callOffsActive.where('callOff.endDate > :expiringSoonDate', {
      expiringSoonDate,
    });
    if (sectionCode) {
     
      callOffsActive.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      callOffsExpiring.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      callOffsExpired.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
     
    }
    callOffsActive
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    callOffsExpiring
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    callOffsExpired
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    const [active, expiringSoon, expired] = await Promise.all([
      callOffsActive.getMany(),
      callOffsExpiring.getMany(),
      callOffsExpired.getMany(),
    ]);
    return {
      active,
      expiringSoon,
      expired,
    };
  }

  async getCallOffBySESValidity(sectionCode?: string) {
    const callOffsExpiring = this.coffRepo.createQueryBuilder('callOff');
    const callOffsExpired = this.coffRepo.createQueryBuilder('callOff');

    const callOffsActive = this.coffRepo.createQueryBuilder('callOff');

    const expiringSoonDate = moment().add(10, 'days').format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');
 
    callOffsExpiring.where('callOff.sesEndDate <= :expiringSoonDate', {
      expiringSoonDate,
    });

    callOffsExpired.where('callOff.sesEndDate <= :todayDate', { todayDate });

    callOffsActive.where('callOff.sesEndDate > :expiringSoonDate', {
      expiringSoonDate,
    });
    if (sectionCode) {
     
      callOffsActive.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      callOffsExpiring.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      callOffsExpired.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });

    }
    callOffsActive
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    callOffsExpiring
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    callOffsExpired
    .leftJoin('callOff.contract', 'contract')
    .addSelect([
      'contract.sectionCode',
      'contract.vendorName',
      'contract.vendorCode',
    ])
    const [active, expiringSoon, expired] = await Promise.all([
      callOffsActive.getMany(),
      callOffsExpiring.getMany(),
      callOffsExpired.getMany(),
    ]);
    return {
      active,
      expiringSoon,
      expired,
    };
  }

  async getTotal(dto: GetCallOffDto) {
    const {
      coffCurrency,
      sectionCode,
      contractNo,
      archived,
      emailAlerts,
      endDateGT,
      endDateLT,
      startDateGT,
      startDateLT,
      sesEndDateGT,
      sesEndDateLT,
    } = dto;
    const queryBuilder = this.coffRepo.createQueryBuilder('callOff');
    coffCurrency &&
      queryBuilder.andWhere('callOff.coffCurrency = :coffCurrency', {
        coffCurrency,
      });
    sectionCode &&
      queryBuilder.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });

    contractNo &&
      queryBuilder.andWhere('contract.contractNo = :contractNo', {
        contractNo,
      });

      archived &&
      queryBuilder.andWhere('callOff.archived = :archived', {
        archived,
      });
      emailAlerts &&
      queryBuilder.andWhere('callOff.emailAlerts = :emailAlerts', {
        emailAlerts,
      });

      archived &&
      queryBuilder.andWhere('callOff.archived = :archived', {
        archived,
      });

      startDateLT &&
      queryBuilder.andWhere('callOff.startDate <= :startDateLT', {
        startDateLT,
      });
      startDateGT &&
      queryBuilder.andWhere('callOff.startDate >= :startDateGT', {
        startDateGT,
      });
      endDateLT &&
      queryBuilder.andWhere('callOff.endDate <= :endDateLT', {
        endDateLT,
      });
      endDateGT &&
      queryBuilder.andWhere('callOff.endDate >= :endDateGT', {
        endDateGT,
      });
      sesEndDateLT &&
      queryBuilder.andWhere('callOff.sesEndDate <= :sesEndDateLT', {
        sesEndDateLT,
      });

      sesEndDateGT &&
      queryBuilder.andWhere('callOff.sesEndDate >= :sesEndDateGT', {
        sesEndDateGT,
      });

    return queryBuilder
      .leftJoin('callOff.contract', 'contract')
      .getCount();
  }
}
