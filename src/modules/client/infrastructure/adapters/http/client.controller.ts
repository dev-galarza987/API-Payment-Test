import {
  Controller,
  Post,
  Body,
  Get,
  /*Param,
  ParseIntPipe,
  NotFoundException,*/
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClientUseCase } from 'src/modules/client/application/use-cases/create-client.use-case';
import { FindAllClientsUseCase } from 'src/modules/client/application/use-cases/find-all-clients.use-case';
import {
  CreateClientDto,
  FindAllClientsResponseDto,
  ClientResponseDto,
} from 'src/modules/client/domain/dtos/client.dto';

@ApiTags('clients')
@Controller('client/')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async createClient(@Body() createClientDto: CreateClientDto) {
    return await this.createClientUseCase.execute(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'List of all clients retrieved successfully',
    type: FindAllClientsResponseDto,
  })
  async getAllClients(): Promise<FindAllClientsResponseDto> {
    const clients = await this.findAllClientsUseCase.execute();

    // Transform entities to response DTOs
    const clientsResponse: ClientResponseDto[] = clients.map((client) => ({
      id: client.id,
      code: client.code,
      name: client.name,
      lastname: client.lastname,
      email: client.email,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }));

    return {
      clients: clientsResponse,
      total: clients.length,
    };
  }

  // Ejemplo de otro endpoint para consultar, usando otro caso de uso
  // @Get(':id')
  // async getClientById(@Param('id', ParseIntPipe) id: number) {
  //   const client = await this.findClientUseCase.execute(id);
  //   if (!client) throw new NotFoundException('Client not found');
  //   return client;
  // }
}
