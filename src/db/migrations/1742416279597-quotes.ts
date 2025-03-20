import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Quotes1742416279597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quotes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'from_currency',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'to_currency',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'numeric',
            precision: 20,
            scale: 8,
            isNullable: false,
          },
          {
            name: 'rate',
            type: 'numeric',
            precision: 38,
            scale: 18,
            isNullable: false,
          },
          {
            name: 'converted_amount',
            type: 'numeric',
            precision: 38,
            scale: 18,
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quotes');
  }
}
