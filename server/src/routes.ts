import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { HelloModule } from './api/hello/hello.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [{
      path: '/hello',
      module: HelloModule,
    }],
  },
];
