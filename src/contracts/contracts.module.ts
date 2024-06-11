import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { SectionsModule } from 'src/sections/sections.module';

@Module({
  imports : [TypeOrmModule.forFeature([Contract]),SectionsModule],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports : [ContractsService]
})
export class ContractsModule {}
