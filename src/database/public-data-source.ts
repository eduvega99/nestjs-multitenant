import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // Entities that live in the public schema (shared across all tenants) go here.
  // Tenant-specific entities must be registered in tenant-data-source.ts.
  entities: [],
  migrations: [__dirname + '/migrations/public/*.{ts,js}'],
  migrationsTableName: 'public_schema_migrations',
});
