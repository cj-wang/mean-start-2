import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import cookieParser = require('cookie-parser');
import { AppSSRModule } from './app.ssr.module';

enableProdMode();

async function bootstrap() {
  const app = await NestFactory.create(AppSSRModule);
  app.use(cookieParser());
  app.enableCors({
    methods: 'GET',
    maxAge: 3600,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
