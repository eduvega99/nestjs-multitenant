import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Only tenant-specific entities should be added to this DataSource.
  // Do not include shared/public entities — those belong in public-data-source.ts.
  entities: [],
  migrations: [__dirname + '/migrations/public/*.{ts,js}'],
  migrationsTableName: 'public_schema_migrations',
});
