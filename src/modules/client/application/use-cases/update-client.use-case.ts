import { Injectable, Inject } from '@nestjs/common';
import { UpdateClientDto } from '../../domain/dtos/client.dto';
import { type ClientRepository } from '../../domain/ports/client.repository';
import { Client } from '../../domain/entities/client.entity';
import { CLIENT_REPOSITORY } from '../../client.constants';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(
    code: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    // First, get the existing client to ensure it exists
    const existingClient = await this.clientRepository.findByCode(code);

    // Create updated client object
    const updatedClient = new Client();

    // Keep existing values for fields not provided in update
    updatedClient.id = existingClient.id;
    updatedClient.code = updateClientDto.code ?? existingClient.code;
    updatedClient.name = updateClientDto.name ?? existingClient.name;
    updatedClient.lastname =
      updateClientDto.lastname ?? existingClient.lastname;
    updatedClient.email = updateClientDto.email ?? existingClient.email;
    updatedClient.createdAt = existingClient.createdAt;

    // Only update password if provided
    if (updateClientDto.password) {
      updatedClient.password = updateClientDto.password; // Password should be hashed in a real application
    } else {
      updatedClient.password = existingClient.password;
    }

    // Perform the update
    await this.clientRepository.update(code, updatedClient);

    // Return the updated client
    return await this.clientRepository.findByCode(updatedClient.code);
  }
}
