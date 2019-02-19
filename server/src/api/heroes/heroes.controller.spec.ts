import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

describe('Heroes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [HeroesService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: HeroesController = module.get<HeroesController>(HeroesController);
    expect(controller).toBeDefined();
  });
});
