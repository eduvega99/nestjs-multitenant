import { runSeeders } from 'typeorm-extension';

import tenantFactory from '../src/database/factories/tenant.factory';
import userFactory from '../src/database/factories/user.factory';
import publicDataSource from '../src/database/public-data-source';
import { TenantSeeder } from '../src/database/seeds/tenant.seeder';
import { UserSeeder } from '../src/database/seeds/user.seeder';

void (async () => {
  await publicDataSource.initialize();
  await runSeeders(publicDataSource, {
    seeds: [TenantSeeder, UserSeeder],
    factories: [tenantFactory, userFactory],
  });
  await publicDataSource.destroy();
})();
