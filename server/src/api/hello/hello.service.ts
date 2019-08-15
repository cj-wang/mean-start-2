import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HelloService {
  hello(name: string): string {
    name = name.split(' ')[0];
    Logger.log(`Hello ${name}!`);
    return `Hello ${name}!`;
  }
}
