import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  private hashPassword(password: string) {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }
}
