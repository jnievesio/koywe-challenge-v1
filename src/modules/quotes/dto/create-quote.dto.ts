import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsIn } from 'class-validator';

const allowedCurrencies = ['ARS', 'CLP', 'MXN', 'USDC', 'BTC', 'ETH', 'USD'];

export class CreateQuoteDto {
  @ApiProperty({
    example: 1000000,
    description: 'Monto a convertir',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'ARS',
    description: 'Moneda origen',
  })
  @IsString()
  @IsIn(allowedCurrencies)
  from: string;

  @ApiProperty({
    example: 'ETH',
    description: 'Moneda destino',
  })
  @IsString()
  @IsIn(allowedCurrencies)
  to: string;
}
