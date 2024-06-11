import { Module } from '@nestjs/common';
import { RequisitionsController } from './requisitions.controller';
import { RequisitionsService } from './requisitions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisition } from './requisition.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Requisition])],
  controllers: [RequisitionsController],
  providers: [RequisitionsService],
  exports : [RequisitionsService]
})
export class RequisitionsModule {}
