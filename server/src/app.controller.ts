import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  hello(): string {
    return this.appService.hello();
  }
}
