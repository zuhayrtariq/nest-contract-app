import { Module } from '@nestjs/common';
import { CallOffsService } from './call-offs.service';
import { CallOffsController } from './call-offs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallOff } from './call-off.entity';

@Module({
    imports : [TypeOrmModule.forFeature([CallOff])],
    controllers : [CallOffsController],
    providers: [CallOffsService],
    exports : [CallOffsService]
})
export class CallOffsModule {}
