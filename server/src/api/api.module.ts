import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [HelloModule, HeroesModule],
})
export class ApiModule {}
