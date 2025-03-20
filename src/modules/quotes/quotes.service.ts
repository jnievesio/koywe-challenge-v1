import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CryptoMktService } from '../shared/cryptomkt.service';
import { Decimal } from 'decimal.js';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    private readonly cryptoMktService: CryptoMktService,
  ) {}

  async getQuoteById(id: string) {
    return await this.quoteRepository.findOne({ where: { id } });
  }
  async createQuote(createQuoteDto: CreateQuoteDto) {
    const rate = await this.getExchangeRate(
      createQuoteDto.from,
      createQuoteDto.to,
    );

    const formattedRate = new Decimal(rate);
    const convertedAmount = new Decimal(createQuoteDto.amount)
      .times(formattedRate)
      .toFixed(18);

    const timestamp = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const quote = this.quoteRepository.create({
      fromCurrency: createQuoteDto.from,
      toCurrency: createQuoteDto.to,
      amount: createQuoteDto.amount,
      rate: formattedRate,
      convertedAmount: convertedAmount,
      timestamp: timestamp,
      expiresAt: expiresAt,
    } as Quote);

    const newQuote = await this.quoteRepository.save(quote);

    return {
      id: newQuote.id,
      fromCurrency: newQuote.fromCurrency,
      toCurrency: newQuote.toCurrency,
      amount: Number(newQuote.amount),
      rate: new Decimal(newQuote.rate).toNumber(),
      convertedAmount: newQuote.convertedAmount,
      timestamp: newQuote.timestamp,
      expiresAt: newQuote.expiresAt,
    };
  }
  private simulateExchangeRate(from: string, to: string): number {
    const rates = {
      'ARS-ETH': 0.0000003715911159995987,
      'ETH-ARS': 2691130,
      'ARS-BTC': 0.000000008741239791717934,
      'BTC-ARS': 114400248,
    };
    return rates[`${from}-${to}`];
  }

  private async getExchangeRate(from: string, to: string): Promise<number> {
    const apiRate = await this.cryptoMktService.getExchangeRate(from, to);
    return apiRate ?? this.simulateExchangeRate(from, to);
  }
}
