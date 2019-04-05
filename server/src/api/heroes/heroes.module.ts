import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  imports: [AuthModule],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
