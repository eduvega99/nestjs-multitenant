import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant } from './entities/tenant.entity';
import { TenantConnectionManager } from './providers/tenant-connection.manager';
import { TenantMigrationsService } from './services/tenat-migrations.service';
import { TenantsService } from './tenants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), ConfigModule],
  providers: [TenantsService, TenantMigrationsService, TenantConnectionManager],
})
export class TenantsModule {}
