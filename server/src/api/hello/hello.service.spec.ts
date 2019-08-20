import { Test, TestingModule } from '@nestjs/testing';
import { HelloService } from './hello.service';

describe('HelloService', () => {
  let service: HelloService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloService],
    }).compile();
    service = module.get<HelloService>(HelloService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hello', () => {
    it('should return "Hello name!"', () => {
      expect(service.hello('name')).toBe('Hello name!');
    });
  });
});
