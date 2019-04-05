import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ApiModule } from './api/api.module';
import { routes } from './routes';
import { join } from 'path';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import 'localstorage-polyfill';

const BROWSER_DIR = join(process.cwd(), 'dist/client');
applyDomino(global, join(BROWSER_DIR, 'index.html'));

/* tslint:disable-next-line:no-string-literal */
global['Event'] = null;

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ApiModule,
    AngularUniversalModule.forRoot({
      viewsPath: BROWSER_DIR,
      bundle: require('../../dist/ssr/main.js'),
    }),
  ],
})
export class AppSSRModule {}
