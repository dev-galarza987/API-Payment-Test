import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  /*ParseIntPipe,
  NotFoundException,*/
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateClientUseCase } from 'src/modules/client/application/use-cases/create-client.use-case';
import { FindAllClientsUseCase } from 'src/modules/client/application/use-cases/find-all-clients.use-case';
import { UpdateClientUseCase } from 'src/modules/client/application/use-cases/update-client.use-case';
import {
  CreateClientDto,
  UpdateClientDto,
  FindAllClientsResponseDto,
  ClientResponseDto,
} from 'src/modules/client/domain/dtos/client.dto';

@ApiTags('clients')
@Controller('client/')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
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

  @Patch(':code/update')
  @ApiOperation({ summary: 'Update a client by code' })
  @ApiParam({
    name: 'code',
    description: 'Client code',
    example: 'CLI001',
  })
  @ApiResponse({
    status: 200,
    description: 'Client updated successfully',
    type: ClientResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async updateClient(
    @Param('code') code: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const updatedClient = await this.updateClientUseCase.execute(
      code,
      updateClientDto,
    );

    // Transform entity to response DTO
    return {
      id: updatedClient.id,
      code: updatedClient.code,
      name: updatedClient.name,
      lastname: updatedClient.lastname,
      email: updatedClient.email,
      createdAt: updatedClient.createdAt,
      updatedAt: updatedClient.updatedAt,
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
