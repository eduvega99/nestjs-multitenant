import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './config/database.config';
import envConfig from './config/env.config';
import { AppConfig } from './config/interfaces/app-config.interface';
import { validate } from './config/validations/config.validation';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig, databaseConfig],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) =>
        configService.get('database', { infer: true }),
    }),
    TenantsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
