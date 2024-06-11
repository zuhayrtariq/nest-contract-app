import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallOffsModule } from './call-offs/call-offs.module';
import { SectionsModule } from './sections/sections.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './sections/section.entity';
import { CallOff } from './call-offs/call-off.entity';
import { ContractsModule } from './contracts/contracts.module';
import { RequisitionsModule } from './requisitions/requisitions.module';
import { Contract } from './contracts/contract.entity';
import { Requisition } from './requisitions/requisition.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [CallOffsModule, SectionsModule, ContractsModule, RequisitionsModule,TypeOrmModule.forRoot({
 
    type : 'mssql',
    host : 'pkkhidev02',
    port : 1433,
    database : 'ICT_Contracts',
    username : 'Contracts_user',
    password : 'Contracts',
    synchronize : true,
    entities : [Section, CallOff , Contract, Requisition],
    options :{
      encrypt : false,
      
    }
  },
)],
  controllers: [AppController],
  providers: [AppService,AuthService],
})
export class AppModule {}
