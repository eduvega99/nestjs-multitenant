import { Tenant } from 'src/tenants/entities/tenant.entity';

declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
    }
  }
}
