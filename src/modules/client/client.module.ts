import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientController } from './infrastructure/adapters/http/client.controller';
import { ClientProviders } from './client.providers';
import { Client } from './domain/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [...ClientProviders],
  exports: [...ClientProviders], // Exportar el puerto si otros módulos lo necesitan.
})
export class ClientModule {}
