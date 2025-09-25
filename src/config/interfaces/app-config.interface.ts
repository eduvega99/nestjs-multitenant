import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

import envConfig from '../env.config';

export interface AppConfig extends ReturnType<typeof envConfig> {
  database: PostgresConnectionOptions;
}
