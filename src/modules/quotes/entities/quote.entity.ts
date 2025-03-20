import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'from_currency' })
  fromCurrency: string;

  @Column({ name: 'to_currency' })
  toCurrency: string;

  @Column('decimal', { precision: 20, scale: 8 })
  amount: number;

  @Column('decimal', { precision: 38, scale: 18 })
  rate: number;

  @Column('decimal', { precision: 20, scale: 8, name: 'converted_amount' })
  convertedAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;
}
