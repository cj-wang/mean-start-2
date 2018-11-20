import { Injectable, Logger } from '@nestjs/common';
import { Hello } from '../../../../shared/hello';

@Injectable()
export class HelloService {
  hello(): string {
    Logger.log('hello');
    return 'Hello World!';
  }

  greeting(hello: Hello): Hello {
    Logger.log('greeting');
    hello.greeting = `Hello ${hello.name}!`;
    Logger.log(hello);
    return hello;
  }
}
