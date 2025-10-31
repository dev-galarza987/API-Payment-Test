import { Injectable, Inject } from '@nestjs/common';
import { CreateClientDto } from '../../domain/dtos/client.dto';
import { type ClientRepository } from '../../domain/ports/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { CLIENT_REPOSITORY } from '../../client.constants';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(createClientDto: CreateClientDto): Promise<void> {
    const newClient = new Client();
    newClient.code = createClientDto.code;
    newClient.name = createClientDto.name;
    newClient.lastname = createClientDto.lastname;
    newClient.email = createClientDto.email;
    newClient.password = createClientDto.password; // La contraseña se hashearía en un servicio aparte.

    await this.clientRepository.save(newClient);
  }
}
