import { Get, Controller } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  hello(): string {
    return this.apiService.hello();
  }
}
