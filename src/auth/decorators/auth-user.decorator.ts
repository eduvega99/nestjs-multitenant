import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/users/entities/user.entity';

export const AuthUser = createParamDecorator(
  (field: keyof User | undefined, context) => {
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      throw new InternalServerErrorException(
        'User object is missing from the request',
      );
    }
    return field ? user[field] : user;
  },
);
