import { Injectable, Inject } from '@nestjs/common';
import { type ClientRepository } from '../../domain/ports/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { CLIENT_REPOSITORY } from '../../client.constants';

@Injectable()
export class FindAllClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
