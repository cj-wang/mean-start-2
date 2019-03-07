import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as path from 'path';
import * as express from 'express';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// tslint:disable-next-line:no-var-requires
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../ssr/main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'client')));
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
    ],
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
