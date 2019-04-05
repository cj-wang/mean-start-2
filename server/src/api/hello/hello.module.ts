import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [AuthModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
