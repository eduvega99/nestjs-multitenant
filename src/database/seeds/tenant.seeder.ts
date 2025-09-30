import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Tenant } from '../../tenants/entities/tenant.entity';

export class TenantSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const tenantFactory = factoryManager.get(Tenant);
    await tenantFactory.saveMany(2);
  }
}
