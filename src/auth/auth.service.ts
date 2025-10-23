import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

import { pick } from 'src/common/utils/pick.util';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login({ username, password }: LoginDto) {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!compareSync(password, user.password!)) {
        throw new UnauthorizedException();
      }
      return this.generateAuthPayload(user);
    } catch {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  generateAuthPayload(user: User) {
    return {
      user: pick(user, ['id', 'username']),
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
