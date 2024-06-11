import { Contract } from "src/contracts/contract.entity";
import { Requisition } from "src/requisitions/requisition.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Section{

    @PrimaryColumn('varchar',{length : 5})
    sectionCode : string
    
    @Column()
    sectionHeadName : string;
    
    @Column()
    sectionHeadEmail : string;

    @OneToMany(() => Requisition, (requisition) =>requisition.section)
    requisitions : Requisition[]

    @OneToMany(() => Contract, (contract) => contract.section)
    contracts : Contract[]
}