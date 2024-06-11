import { Test, TestingModule } from '@nestjs/testing';
import { CallOffsService } from './call-offs.service';

describe('CallOffsService', () => {
  let service: CallOffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallOffsService],
    }).compile();

    service = module.get<CallOffsService>(CallOffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
