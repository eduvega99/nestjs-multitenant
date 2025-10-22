import {
  ConflictException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

import { ClientsService } from '../clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable({ scope: Scope.REQUEST })
export class UniqueEmailPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly clientsService: ClientsService,
  ) {}

  async transform(value: CreateClientDto | UpdateClientDto) {
    const { email } = value;
    if (!email) {
      return value;
    }
    const id = parseInt(this.request.params.id);
    const client = await this.clientsService.findOneByEmail(email);
    if (client && client.id !== id) {
      throw new ConflictException(`The email "${email}" is already in use`);
    }
    return value;
  }
}
