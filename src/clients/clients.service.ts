import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TENANT_CONNECTION } from 'src/tenants/providers/tenant-connection.provider';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  private readonly clientRepository: Repository<Client>;

  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantDataSource: DataSource,
  ) {
    this.clientRepository = tenantDataSource.getRepository(Client);
  }

  create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw this.createNotFoundException(id);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id,
      ...updateClientDto,
    });
    if (!client) {
      throw this.createNotFoundException(id);
    }
    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    const { affected } = await this.clientRepository.delete({ id });
    if (!affected) {
      throw this.createNotFoundException(id);
    }
  }

  private createNotFoundException(id: number) {
    return new NotFoundException(`Client with id "${id}" not found`);
  }
}
