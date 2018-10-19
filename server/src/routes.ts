import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [],
  },
];
