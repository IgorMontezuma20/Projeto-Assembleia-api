import { Test, TestingModule } from '@nestjs/testing';
import { VotoService } from './voto.service';

describe('VotoService', () => {
  let service: VotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotoService],
    }).compile();

    service = module.get<VotoService>(VotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
