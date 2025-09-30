import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { Tenant } from '../../tenants/entities/tenant.entity';

export default setSeederFactory(Tenant, () => {
  const tenant = new Tenant();
  tenant.name = faker.company.name();

  return tenant;
});
