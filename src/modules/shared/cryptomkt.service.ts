import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CryptoMktService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate(from: string, to: string): Promise<number> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://api.exchange.cryptomkt.com/api/3/public/price/rate',
          {
            params: { from, to },
          },
        ),
      );
      /*
        Example response
        {
          "BTC": {
            "currency": "USDT",
            "price": "85834.39",
            "timestamp": "2025-03-19T21:35:26.730Z"
          }
        }
        */

      if (response.data?.[from]?.price) {
        return Number(response.data[from].price);
      }
      return null;
    } catch (error) {
      console.error('CryptoMKT API error:', error.message);
      return null;
    }
  }
}
