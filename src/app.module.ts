import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/middlewares/jwt.middleware';
import { ClientsModule } from './clients/clients.module';
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
    AuthModule,
    ClientsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude('auth/login').forRoutes('*path');
  }
}
