import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Hello } from '../../../../shared/hello';

@Controller()
export class HelloController {

  constructor(private readonly helloService: HelloService) {}

  @Get()
  hello(): string {
    return this.helloService.hello();
  }

  @Post()
  @HttpCode(200)
  greeting(@Body() hello: Hello): Hello {
    return this.helloService.greeting(hello);
  }
}
