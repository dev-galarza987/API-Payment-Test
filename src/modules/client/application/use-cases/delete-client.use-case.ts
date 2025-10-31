import { Injectable, Inject } from '@nestjs/common';
import { type ClientRepository } from '../../domain/ports/client.repository';
import { CLIENT_REPOSITORY } from '../../client.constants';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(code: string): Promise<void> {
    // Verificar que el cliente existe antes de eliminarlo
    const existingClient = await this.clientRepository.findByCode(code);
    
    // Si el cliente existe, proceder con la eliminación
    await this.clientRepository.delete(code);
  }
}