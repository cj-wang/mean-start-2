import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ApiModule } from './api/api.module';

const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [],
  },
];
@Module({
  imports: [RouterModule.forRoutes(routes), ApiModule],
})
export class AppModule {}
