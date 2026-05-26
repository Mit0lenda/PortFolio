import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => String(value ?? '').trim())
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(254)
  @Transform(({ value }) => String(value ?? '').toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  @Transform(({ value }) => String(value ?? '').trim())
  message: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => (value ? String(value).trim() : undefined))
  service?: string;
}
