import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  // Swagger Documentation
  @ApiProperty({
    description: 'Unique client code',
    example: 'CLI001',
    maxLength: 20,
  })
  // Validation
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code: string;

  // Swagger Documentation
  @ApiProperty({
    description: 'Client first name',
    example: 'John',
    maxLength: 100,
  })
  // Validation
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  // Swagger Documentation
  @ApiProperty({
    description: 'Client last name',
    example: 'Doe',
    maxLength: 100,
  })
  // Validation
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastname: string;

  // Swagger Documentation
  @ApiProperty({
    description: 'Client email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  // Validation
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Swagger Documentation
  @ApiProperty({
    description: 'Client password',
    example: 'password123',
    minLength: 6,
  })
  // Validation
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateClientDto {
  // Swagger Documentation
  @ApiPropertyOptional({
    description: 'Unique client code',
    example: 'CLI001',
    maxLength: 20,
  })
  // Validation
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code!: string;

  // Swagger Documentation
  @ApiPropertyOptional({
    description: 'Client first name',
    example: 'John',
    maxLength: 100,
  })
  // Validation
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  // Swagger Documentation
  @ApiPropertyOptional({
    description: 'Client last name',
    example: 'Doe',
    maxLength: 100,
  })
  // Validation
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastname?: string;

  // Swagger Documentation
  @ApiPropertyOptional({
    description: 'Client email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  // Validation
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  // Swagger Documentation
  @ApiPropertyOptional({
    description: 'Client password',
    example: 'password123',
    minLength: 6,
  })
  // Validation
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;
}
