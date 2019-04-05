import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HelloService } from './hello.service';
import { Hello } from '../../../../shared/hello';

@Controller()
@UseGuards(AuthGuard())
export class HelloController {

  constructor(private readonly helloService: HelloService) {}

  @Get()
  hello(@Req() req): Hello {
    return {
      greeting: this.helloService.hello(req.user.name),
    };
  }
}
