import { Contract } from 'src/contracts/contract.entity';
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
export class Requisition {
  @PrimaryColumn('bigint')
  reqNo: number;

  @Column('varchar', { length: '75' })
  title: string;

  @Column('varchar', { length: '50', default: 'To Be Decided' })
  vendorName: string;

  @Column('varchar', { length: '50', default: 'Unknown' })
  buyerName: string;

  @Column('float')
  reqACV: number;

  @Column('varchar', { default: 'USD', length: '5' })
  reqCurrency: string;

  @Column('varchar', { length: '50' })
  reqType: string;

  @Column('tinyint', { default: 0 })
  archived: number;

  @Column('tinyint', { default: 1 })
  emailAlerts: number;

  @Column('date')
  reqDate: Date;

  @Column('varchar', { length: 'MAX', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', {length : 5, nullable: true})
  sectionCode : string

  @ManyToOne(() => Section, (section) =>section.requisitions,{nullable : false})
  @JoinColumn({foreignKeyConstraintName : "FK_RequisitionSectionCode", name : 'sectionCode'})
  section : Section

  @OneToMany(() =>Contract,(contract)=>contract.requisition)
  contracts : Contract[]

}
