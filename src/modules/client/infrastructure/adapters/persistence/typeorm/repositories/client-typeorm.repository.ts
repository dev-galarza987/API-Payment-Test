import { Repository } from 'typeorm';
import { ClientRepository } from 'src/modules/client/domain/ports/client.repository';
import { Injectable } from '@nestjs/common';
import { Client } from 'src/modules/client/domain/entities/client.entity';

@Injectable()
export class ClientTypeormRepository implements ClientRepository {
  constructor(private readonly repository: Repository<Client>) {}

  async save(client: Client): Promise<void> {
    // Use TypeORM to persist the client entity (insert or update as needed)
    const newClient = this.repository.create(client);
    await this.repository.save(newClient);
  }

  async update(code: string, client: Client): Promise<void> {
    const existing = await this.repository.findOneBy({ code });
    if (!existing) {
      throw new Error(`Client with code ${code} not found`);
    }

    // Merge incoming changes into the existing entity and persist
    const merged = this.repository.create({ ...existing, ...client });
    await this.repository.save(merged);
  }

  async findByCode(code: string): Promise<Client> {
    const client = await this.repository.findOneBy({ code });
    if (!client) {
      throw new Error(`Client with code ${code} not found`);
    }
    return client;
  }

  async findById(id: number): Promise<Client> {
    const client = await this.repository.findOneBy({ id });
    try {
      if (!client) {
        // Create a custom error or handle it as per your application's error handling strategy
      }
    } catch (error) {
      // Handle the error
      console.error('Error finding client by id:', error);
      //   throw error; // Rethrow or handle it accordingly
    }

    if (!client) {
      // Create a custom error or handle it as per your application's error handling strategy
      throw new Error(`Client with id ${id} not found`);
    }
    return client;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.repository.findOneBy({ email });
    return client ?? undefined;
  }

  async findAll(): Promise<Client[]> {
    return this.repository.find();
  }

  async delete(code: string): Promise<void> {
    await this.repository.delete({ code });
  }
}
