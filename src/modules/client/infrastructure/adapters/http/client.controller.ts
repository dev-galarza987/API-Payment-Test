import {
  Controller,
  Post,
  Body,
  /*Get,
  Param,
  ParseIntPipe,
  NotFoundException,*/
} from '@nestjs/common';
import { CreateClientUseCase } from 'src/modules/client/application/use-cases/create-client.use-case';
import { CreateClientDto } from 'src/modules/client/domain/dtos/client.dto';
// Importa otros casos de uso si los tuvieras: FindClientUseCase, etc.

@Controller('client/')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    // Aquí se inyectarían otros casos de uso...
  ) {}

  @Post('create')
  async createClient(@Body() createClientDto: CreateClientDto) {
    return await this.createClientUseCase.execute(createClientDto);
  }

  // Ejemplo de otro endpoint para consultar, usando otro caso de uso
  // @Get(':id')
  // async getClientById(@Param('id', ParseIntPipe) id: number) {
  //   const client = await this.findClientUseCase.execute(id);
  //   if (!client) throw new NotFoundException('Client not found');
  //   return client;
  // }
}
