import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .addSelect('user.password')
      .where('username = :username', { username })
      .getOne();
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  async findUserWithTenantById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        tenant: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }
}
