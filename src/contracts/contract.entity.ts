import { CallOff } from 'src/call-offs/call-off.entity';
import { Requisition } from 'src/requisitions/requisition.entity';
import { Section } from 'src/sections/section.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryColumn('bigint')
  contractNo: number;

  // @Column('varchar',{length: 5})
  // sectionCode: string;

  @Column('varchar', { length: 75 })
  title: string;

  @Column('bigint',{nullable : true})
  reqNo?: number;

  @Column('int')
  vendorCode: number;

  @Column('varchar', { length: 50 })
  vendorName: string;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('float')
  contractTRXValue: number;

  @Column('float')
  contractOpenValue: number;

  @Column('varchar', { length: 5 })
  contractCurrency: string;

  @Column('tinyint', { default: 0 })
  archived: boolean;

  @Column('tinyint', { default: 1 })
  emailAlerts: boolean;

  @Column('varchar', { length: 'MAX', nullable: true })
  notes: string;

  @Column('varchar',{length : 5})
  sectionCode : string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Section, (section) =>section.contracts)
  @JoinColumn({name : "sectionCode" , foreignKeyConstraintName : 'FK_ContractsSectionCode'})
  section : Section

  @ManyToOne(() => Requisition, (requisition) =>requisition.contracts,{nullable: true})
  @JoinColumn({name : "reqNo" , foreignKeyConstraintName : 'FK_ContractsRequisitionNo',})
  requisition : Requisition

  @OneToMany(() => CallOff, (callOff) => callOff.contract)
  callOffs : CallOff[]

}
