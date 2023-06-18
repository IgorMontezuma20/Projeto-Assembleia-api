import { Test, TestingModule } from '@nestjs/testing';
import { VotoController } from './voto.controller';

describe('VotoController', () => {
  let controller: VotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotoController],
    }).compile();

    controller = module.get<VotoController>(VotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
