import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { HttpModule } from '@nestjs/axios';
import { CryptoMktService } from '../shared/cryptomkt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), SharedModule, HttpModule],
  controllers: [QuotesController],
  providers: [QuotesService, CryptoMktService],
})
export class QuotesModule {}
