import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { AppConfig } from 'src/config/interfaces/app-config.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly jwtSecret: string;

  constructor(
    private readonly configService: ConfigService<AppConfig, true>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtSecret = configService.get('jwtSecret', { infer: true });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new UnauthorizedException('Authentication token is required');
      }
      const token = this.extractBearerToken(authorization);
      const user = await this.getUserFromToken(token);
      req.user = user;
      // 🔑 Key point: 'req.tenant' is used by 'TENANT_CONNECTION' provider
      // to select and inject the correct tenant-specific schema connection
      req.tenant = user.tenant;
      next();
    } catch (error) {
      const exception =
        error instanceof HttpException
          ? error
          : new InternalServerErrorException(error);
      return res.status(exception.getStatus()).json(exception.getResponse());
    }
  }

  private extractBearerToken(authorization: string) {
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid authentication method');
    }
    return token;
  }

  private async getUserFromToken(token: string) {
    try {
      const { id } = this.jwtService.verify<{ id: string }>(token, {
        secret: this.jwtSecret,
      });
      return await this.usersService.findUserWithTenantById(id);
    } catch {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
