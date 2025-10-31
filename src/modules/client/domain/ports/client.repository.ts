import { Client } from '../entities/client.entity';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  update(code: string, client: Client): Promise<void>;
  findById(id: number): Promise<Client>;
  findByCode(code: string): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findAll(): Promise<Client[]>;
  delete(code: string): Promise<void>;
}
