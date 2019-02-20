import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, '../../client')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
