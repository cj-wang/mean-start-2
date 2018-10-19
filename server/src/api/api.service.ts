import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  hello(): string {
    return 'Hello World!';
  }
}
