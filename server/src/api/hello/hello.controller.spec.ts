import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('Hello Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: HelloController = module.get<HelloController>(HelloController);
    expect(controller).toBeDefined();
  });
});
