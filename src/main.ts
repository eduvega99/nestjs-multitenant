import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { TrimBodyPipe } from './common/pipes/trim-body.pipe';
import { AppConfig } from './config/interfaces/app-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new TrimBodyPipe(),
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
  await app.listen(configService.get('port'));
}

void bootstrap();
