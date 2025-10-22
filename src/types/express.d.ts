import { Tenant } from 'src/tenants/entities/tenant.entity';
import { User } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      tenant?: Tenant;
    }
  }
}
