import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@AuthUser('tenantId') tenantId: number) {
    return this.usersService.findAllByTenantId(tenantId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser('tenantId') tenantId: number,
  ) {
    return this.usersService.findOneByIdAndTenantId(id, tenantId);
  }
}
