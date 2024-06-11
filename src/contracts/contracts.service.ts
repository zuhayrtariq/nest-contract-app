import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Brackets, Repository } from 'typeorm';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { CallOff } from 'src/call-offs/call-off.entity';
import * as moment from 'moment';
import { SectionsService } from 'src/sections/sections.service';
import { GetContractDto } from './dtos/get-contract.dto';
import { abort } from 'process';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
  ) { }
  @Inject(SectionsService)
  private readonly sectionService: SectionsService

  getOne(contractNo: number) {
    return this.contractRepo.findOneBy({ contractNo });
  }
  getAll(dto: GetContractDto) {
    const { sectionCode, archived, emailAlerts, contractCurrency, endDateGT, endDateLT, startDateGT, startDateLT, vendorCode } = dto
    const queryBuilder = this.contractRepo.createQueryBuilder('contract');
    sectionCode && queryBuilder.andWhere('contract.sectionCode = :sectionCode', { sectionCode })

    archived && queryBuilder.andWhere('contract.archived = :archived', { archived })

    emailAlerts && queryBuilder.andWhere('contract.emailAlerts = :emailAlerts', { emailAlerts })

    contractCurrency && queryBuilder.andWhere('contract.contractCurrency = :contractCurrency', { contractCurrency })

    startDateLT && queryBuilder.andWhere('contract.startDate <= :startDateLT', { startDateLT })

    startDateGT && queryBuilder.andWhere('contract.startDate >= :startDateGT', { startDateGT })

    endDateLT && queryBuilder.andWhere('contract.endDate <= :endDateLT', { endDateLT })

    endDateGT && queryBuilder.andWhere('contract.endDate >= :endDateGT', { endDateGT })

    vendorCode && queryBuilder.andWhere('contract.vendorCode = :vendorCode', { vendorCode })

    return queryBuilder
      .getMany();
  }


  async getContractByValidity(sectionCode?: string) {
    const contractsExpiring = this.contractRepo.createQueryBuilder('contract');
    const contractsExpired = this.contractRepo.createQueryBuilder('contract');

    const contractsActive = this.contractRepo.createQueryBuilder('contract');

    const expiringSoonDate = moment().add(7, 'months').format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');

    contractsExpiring.where('contract.endDate <= :expiringSoonDate', {
      expiringSoonDate,
    });

    contractsExpired.where('contract.endDate <= :todayDate', { todayDate });

    contractsActive.where('contract.endDate > :expiringSoonDate', {
      expiringSoonDate,
    });
    if (sectionCode) {
      contractsActive.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      contractsExpiring.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
      contractsExpired.andWhere('contract.sectionCode = :sectionCode', {
        sectionCode,
      });
    }
    const [active, expiringSoon, expired] = await Promise.all([
      contractsActive.getMany(),
      contractsExpiring.getMany(),
      contractsExpired.getMany(),
    ]);
    return {
      active,
      expiringSoon,
      expired,
    };
  }


  async getContractsValue(sectionCode?: string) {

    const sections = await this.sectionService.getAllSectionCodes();
    const contractData: any = await this.getAll({});
    const usdPkr = 290;
    const usdEur = 1.1;
    const consolidatedData = sections.map(x => {
      return {
        sectionCode: x,
        totalValue: 0,
        totalOpenValue: 0,
        totalUtilizedValue: 0,
      }
    })

    contractData.map(x => {


      if (x.contractCurrency == 'PKR') {
        x.contractUSDValue = parseFloat((x.contractTRXValue / usdPkr).toFixed(2))
        x.contractUSDOpenValue = parseFloat((x.contractOpenValue / usdPkr).toFixed(2))
      }
      else if (x.contractCurrency == 'EUR') {
        x.contractUSDValue = parseFloat((x.contractTRXValue * usdEur).toFixed(2))
        x.contractUSDOpenValue = parseFloat((x.contractOpenValue * usdEur).toFixed(2))
      }
      else {
        x.contractUSDValue = x.contractTRXValue
        x.contractUSDOpenValue = x.contractOpenValue
      }
      x.contractUtilizedValue = parseFloat((x.contractUSDValue - x.contractUSDOpenValue).toFixed(2))
      const sectionIndex = consolidatedData.findIndex(y => y.sectionCode == x.sectionCode)
      if (sectionIndex != -1) {
        consolidatedData[sectionIndex].totalOpenValue += x.contractUSDOpenValue
        consolidatedData[sectionIndex].totalUtilizedValue += x.contractUtilizedValue
      }
    })

    consolidatedData.map(x => {
      x.totalValue = parseFloat((x.totalOpenValue + x.totalUtilizedValue).toFixed(2))
      x.totalOpenValue = parseFloat(x.totalOpenValue.toFixed(2))
      x.totalUtilizedValue = parseFloat(x.totalUtilizedValue.toFixed(2))
    })
    return consolidatedData;

  }

  async getContractWithCoff(contractNo: number) {
    const queryBuilder = this.contractRepo.createQueryBuilder('contract');

    return queryBuilder
      .leftJoinAndSelect('contract.callOffs', 'callOff')
      .where('contract.contractNo = :contractNo', { contractNo })
      .getOne();
  }

  async getAllContractsWithCoff(dto: GetContractDto) {
    const { sectionCode, archived, emailAlerts, contractCurrency, endDateGT, endDateLT, startDateGT, startDateLT, vendorCode } = dto
    const queryBuilder = this.contractRepo.createQueryBuilder('contract');
    sectionCode && queryBuilder.andWhere('contract.sectionCode = :sectionCode', { sectionCode })

    archived && queryBuilder.andWhere('contract.archived = :archived', { archived })

    emailAlerts && queryBuilder.andWhere('contract.emailAlerts = :emailAlerts', { emailAlerts })

    contractCurrency && queryBuilder.andWhere('contract.contractCurrency = :contractCurrency', { contractCurrency })

    startDateLT && queryBuilder.andWhere('contract.startDate <= :startDateLT', { startDateLT })

    startDateGT && queryBuilder.andWhere('contract.startDate >= :startDateGT', { startDateGT })

    endDateLT && queryBuilder.andWhere('contract.endDate <= :endDateLT', { endDateLT })

    endDateGT && queryBuilder.andWhere('contract.endDate >= :endDateGT', { endDateGT })

    vendorCode && queryBuilder.andWhere('contract.vendorCode = :vendorCode', { vendorCode })

    return queryBuilder
      .leftJoinAndSelect('contract.callOffs', 'callOff')
      .getMany();
  }

  async update(contractNo: number, updateContractDto: UpdateContractDto) {
    const contract = await this.getOne(contractNo);
    if (!contract)
      throw new NotFoundException(`Contract Not Found : ${contractNo}`);
    Object.assign(contract, updateContractDto);
    return this.contractRepo.save(contract);
  }
  async deleteContract(contractNo: number) {
    const contract = this.getOne(contractNo);
    if (!contract)
      throw new NotFoundException(`Contract Does not Exist : ${contractNo}`);
    return this.contractRepo.delete(contractNo);
  }

  async getTotal(dto: GetContractDto,requisitionRaised: boolean = false) {
    const { sectionCode, archived, emailAlerts, contractCurrency, endDateGT, endDateLT, startDateGT, startDateLT, vendorCode } = dto
    const queryBuilder = this.contractRepo.createQueryBuilder('contract');
    sectionCode && queryBuilder.andWhere('contract.sectionCode = :sectionCode', { sectionCode })

    archived && queryBuilder.andWhere('contract.archived = :archived', { archived })

    emailAlerts && queryBuilder.andWhere('contract.emailAlerts = :emailAlerts', { emailAlerts })

    contractCurrency && queryBuilder.andWhere('contract.contractCurrency = :contractCurrency', { contractCurrency })

    startDateLT && queryBuilder.andWhere('contract.startDate <= :startDateLT', { startDateLT })

    startDateGT && queryBuilder.andWhere('contract.startDate >= :startDateGT', { startDateGT })

    endDateLT && queryBuilder.andWhere('contract.endDate <= :endDateLT', { endDateLT })

    endDateGT && queryBuilder.andWhere('contract.endDate >= :endDateGT', { endDateGT })

    vendorCode && queryBuilder.andWhere('contract.vendorCode = :vendorCode', { vendorCode })
    requisitionRaised && queryBuilder.andWhere('contract.reqNo IS NOT NULL');
    return queryBuilder.getCount();
  }

  async getContractByStatus(sectionCode? : string) {
    const criticalDateRequisitionRaised = moment().add(1, 'months').format('YYYY-MM-DD');

    const criticalDateNoRequisition = moment().add(6, 'months').format('YYYY-MM-DD');

    const activeContracts = this.contractRepo.createQueryBuilder('contract');
    const criticalContracts = this.contractRepo.createQueryBuilder('contract');

    if(sectionCode)
      {
        activeContracts.andWhere('contract.sectionCode = :sectionCode',{sectionCode})
        criticalContracts.andWhere('contract.sectionCode = :sectionCode',{sectionCode})
      }

   
    activeContracts.andWhere(
      new Brackets((qb) => {
        qb.andWhere('contract.endDate > :criticalDateNoRequisition', { criticalDateNoRequisition });

        qb.orWhere(
          new Brackets((qb2)=>{
          qb2.where('contract.reqNo IS NOT NULL ')
          qb2.andWhere('contract.endDate > :criticalDateRequisitionRaised', { criticalDateRequisitionRaised })
        }));

        

      })
    );

    criticalContracts.andWhere(
      new Brackets((qb)=>{
        qb.andWhere('contract.endDate <=:criticalDateRequisitionRaised', { criticalDateRequisitionRaised })
        qb.orWhere(
          new Brackets((qb2)=>{
            qb2.where("contract.reqNo IS NULL")
            qb2.andWhere('contract.endDate <= :criticalDateNoRequisition', { criticalDateNoRequisition })
    
          })
        )
      })
     
    )

   
   

   
      
    const [active,critical] = await Promise.all(
      [activeContracts.getMany(),
        criticalContracts.getMany()
      ]
    )
    return {active, critical}
  }
}
