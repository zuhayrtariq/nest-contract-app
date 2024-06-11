import { Test, TestingModule } from '@nestjs/testing';
import { CallOffsController } from './call-offs.controller';

describe('CallOffsController', () => {
  let controller: CallOffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallOffsController],
    }).compile();

    controller = module.get<CallOffsController>(CallOffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
