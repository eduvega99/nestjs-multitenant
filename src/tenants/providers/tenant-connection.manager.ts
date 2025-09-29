import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

import { AppConfig } from '../../config/interfaces/app-config.interface';
import { Connection } from '../interfaces/connection.interface';

@Injectable()
export class TenantConnectionManager {
  private readonly connectionOptions: PostgresConnectionOptions;
  private readonly connections = new Map<string, Connection>();
  private readonly INACTIVITY_LIMIT = 10 * 60 * 1000;

  constructor(private readonly configService: ConfigService<AppConfig, true>) {
    this.connectionOptions = configService.get('database', { infer: true });
    setInterval(
      () => void this.disconnectInactiveConnections(),
      this.INACTIVITY_LIMIT,
    );
  }

  async getDataSource(tenantId: number) {
    const schema = `tenant_${tenantId}`;
    const connection = this.connections.get(schema);
    if (connection) {
      connection.lastUsed = Date.now();
      return connection.dataSource;
    }
    const dataSource = new DataSource({
      ...this.connectionOptions,
      schema,
    });
    await dataSource.initialize();
    this.connections.set(schema, {
      dataSource,
      lastUsed: Date.now(),
    });
    return dataSource;
  }

  private async disconnectInactiveConnections() {
    const now = Date.now();
    for (const [schema, { dataSource, lastUsed }] of this.connections) {
      if (now - lastUsed > this.INACTIVITY_LIMIT) {
        await dataSource.destroy();
        this.connections.delete(schema);
      }
    }
  }
}
