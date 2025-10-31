import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './domain/entities/client.entity';
import { CLIENT_REPOSITORY } from './client.constants';

import { ClientTypeormRepository } from './infrastructure/adapters/persistence/typeorm/repositories/client-typeorm.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';

export const ClientProviders: Provider[] = [
  {
    provide: CLIENT_REPOSITORY,
    useFactory: (clientRepo: Repository<Client>) => {
      return new ClientTypeormRepository(clientRepo);
    },
    inject: [getRepositoryToken(Client)],
  },
  CreateClientUseCase,
  // ... otros casos de uso
];
