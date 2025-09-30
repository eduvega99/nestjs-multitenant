import { faker } from '@faker-js/faker';
import { genSaltSync, hashSync } from 'bcryptjs';
import { setSeederFactory } from 'typeorm-extension';

import { User } from '../../users/entities/user.entity';

const salt = genSaltSync();
const password = 'Password_123';

export default setSeederFactory(User, () => {
  const user = new User();
  user.password = hashSync(password, salt);
  user.username = faker.internet.username();
  user.tenantId = faker.number.int({
    min: 1,
    max: 2,
  });

  return user;
});
