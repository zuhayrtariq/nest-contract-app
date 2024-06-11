import { Contract } from 'src/contracts/contract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('call_off')
export class CallOff {
  @PrimaryColumn('bigint')
  coffNo: number;

  @Column('varchar', { length: 75 })
  title: string;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('date')
  sesEndDate: string;

  @Column('float')
  coffAmount: number;

  @Column('float')
  amountToBeInvoiced: number;

  @Column('float')
  amountToBeDelivered: number;

  @Column('varchar', { length: 5 })
  coffCurrency: string;

  @Column('tinyint', { default: 0 })
  archived: boolean;

  @Column('tinyint', { default: 1 })
  emailAlerts: boolean;

  @Column('varchar', { length: 'MAX', nullable: true })
  notes: string;


  @Column('bigint')
  contractNo : number;

  @ManyToOne(() => Contract, (contract) => contract.callOffs)
  @JoinColumn({name : 'contractNo', foreignKeyConstraintName : 'FK_CallOffContractNo'})
  contract : Contract;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
