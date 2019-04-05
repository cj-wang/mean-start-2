import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HelloService {
  hello(name: string): string {
    Logger.log(`Hello ${name}!`);
    return `Hello ${name}!`;
  }
}
