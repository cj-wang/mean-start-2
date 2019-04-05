import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [AuthModule, HelloModule, HeroesModule],
})
export class ApiModule {}
