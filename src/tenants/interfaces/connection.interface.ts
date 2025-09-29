import { DataSource } from 'typeorm';

export interface Connection {
  dataSource: DataSource;
  lastUsed: number;
}
