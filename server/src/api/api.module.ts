import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [HelloModule],
})
export class ApiModule {}
