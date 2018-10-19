import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();
  });

  describe('hello', () => {
    it('should return "Hello World!"', () => {
      const apiController = app.get<ApiController>(ApiController);
      expect(apiController.hello()).toBe('Hello World!');
    });
  });
});
