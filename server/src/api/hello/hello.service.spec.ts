import { Test, TestingModule } from '@nestjs/testing';
import { HelloService } from './hello.service';
import { Hello } from '../../../../shared/hello';

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
    it('should return "Hello World!"', () => {
      expect(service.hello()).toBe('Hello World!');
    });
  });

  describe('greeting', () => {
    it('should return "Hello name!"', () => {
      const hello: Hello = {
        name: 'name',
      };
      expect(service.greeting(hello).greeting).toBe('Hello name!');
    });
  });
});
 