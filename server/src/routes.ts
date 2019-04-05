import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { HelloModule } from './api/hello/hello.module';
import { HeroesModule } from './api/heroes/heroes.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/hello',
        module: HelloModule,
      },
      {
        path: '/heroes',
        module: HeroesModule,
      },
    ],
  },
];
