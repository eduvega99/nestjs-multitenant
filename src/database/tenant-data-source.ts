import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Client } from '../clients/entities/client.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // Only tenant-specific entities should be added to this DataSource.
  // Do not include shared/public entities — those belong in public-data-source.ts.
  entities: [Client],
  migrations: [__dirname + '/migrations/tenant/*.{ts,js}'],
  migrationsTableName: 'tenant_schema_migrations',
});
