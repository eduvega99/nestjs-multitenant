import { InternalServerErrorException, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { TenantConnectionManager } from './tenant-connection.manager';

export const TENANT_CONNECTION = Symbol('TENANT_CONNECTION');

export const tenantConnectionProvider: Provider = {
  scope: Scope.REQUEST,
  provide: TENANT_CONNECTION,
  inject: [REQUEST, TenantConnectionManager],
  useFactory: async (
    { tenant }: Request,
    connectionManager: TenantConnectionManager,
  ) => {
    if (!tenant) {
      throw new InternalServerErrorException('Tenant not available on request');
    }
    return await connectionManager.getDataSource(tenant.id);
  },
};
