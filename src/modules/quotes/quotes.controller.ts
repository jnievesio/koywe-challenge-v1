import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { AuthGuard } from 'src/modules/shared/guard/auth.guard';

@ApiTags('Cotizaciones')
@Controller('quotes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva cotización' })
  @ApiBody({ type: CreateQuoteDto })
  @ApiResponse({
    status: 201,
    description: 'Cotización creada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @HttpCode(201)
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.createQuote(createQuoteDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cotización por ID' })
  @ApiParam({ name: 'id', description: 'ID de la cotización' })
  @ApiResponse({
    status: 200,
    description: 'Cotización encontrada',
  })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada' })
  async findOne(@Param('id') id: string) {
    const quote = await this.quotesService.getQuoteById(id);
    if (!quote) {
      throw new NotFoundException('Cotización no encontrada');
    }

    if (new Date() > quote.expiresAt) {
      throw new NotFoundException('La cotización ha expirado');
    }

    return quote;
  }
}
