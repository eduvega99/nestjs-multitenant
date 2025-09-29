import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

import tenantDataSource from '../../database/tenant-data-source';
import { TenantsService } from '../tenants.service';

@Injectable()
export class TenantMigrationsService implements OnApplicationBootstrap {
  private readonly connectionOptions =
    tenantDataSource.options as PostgresConnectionOptions;

  constructor(private readonly tenantsService: TenantsService) {}

  async onApplicationBootstrap() {
    const tenants = await this.tenantsService.findAll();
    await Promise.all(
      tenants.map((tenant) => this.runTenantMigration(tenant.id)),
    );
  }

  async runTenantMigration(id: number) {
    if (!tenantDataSource.isInitialized) {
      await tenantDataSource.initialize();
    }
    const schema = `tenant_${id}`;
    await tenantDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    const dataSource = new DataSource({
      ...this.connectionOptions,
      schema,
    });
    await dataSource.initialize();
    await dataSource.query(`SET search_path TO ${schema}`);
    await dataSource.runMigrations();
    await dataSource.destroy();
  }
}
