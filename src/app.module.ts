import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import envConfig from './config/env.config';
import configValidation from './config/validations/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: configValidation,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
