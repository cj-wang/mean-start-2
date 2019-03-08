import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { AppSSRModule } from './app.ssr.module';

enableProdMode();

async function bootstrap() {
  const app = await NestFactory.create(AppSSRModule);
  app.enableCors({
    methods: 'GET',
    maxAge: 3600,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
