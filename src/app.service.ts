import { Inject, Injectable } from '@nestjs/common';
import { CallOffsService } from './call-offs/call-offs.service';
import { RequisitionsService } from './requisitions/requisitions.service';
import { ContractsService } from './contracts/contracts.service';
import * as moment from 'moment';

@Injectable()
export class AppService {
  @Inject(ContractsService)
  private readonly contractService: ContractsService
  @Inject(CallOffsService)
  private readonly callOffsService: CallOffsService
  @Inject(RequisitionsService)
  private readonly requisitionsService: RequisitionsService


  getHello(): string {
    return 'Hello World!';
  }
  async getTotal()
  {
    const todayDate = moment().format('YYYY-MM-DD')
    const expiringDate = moment().add(7,'months').format('YYYY-MM-DD');
    const expiringDateCoff = moment().add(20,'days').format('YYYY-MM-DD');
    const totalContracts = await this.contractService.getTotal({archived : 0})
    const totalCallOffs = await this.callOffsService.getTotal({archived : 0})
    const totalRequisitions = await this.requisitionsService.getTotal({archived : 0})
    const activeContracts = await this.contractService.getTotal({archived : 0, endDateGT : expiringDate})
    const activeCallOffs = await this.callOffsService.getTotal({archived : 0,endDateGT : expiringDateCoff})
    const requisitionRaised = await this.contractService.getTotal({archived : 0,endDateLT: expiringDate},true);

    const remainingRequisitions = (totalContracts - activeContracts) - requisitionRaised;
    return {totalContracts,totalCallOffs,totalRequisitions,activeCallOffs,activeContracts,remainingRequisitions,requisitionRaised}
  }
}
