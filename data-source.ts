import { DataSource } from 'typeorm';
import 'dotenv/config';
import { sync } from 'glob';

const entities = sync('src/modules/**/entities/*.entity.ts');

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable de entorno faltante: ${name}`);
  }
  return value;
}

const DATABASE_TYPE = getEnvVariable('DATABASE_TYPE') as
  | 'mysql'
  | 'postgres'
  | 'mongodb';

const dataSource = {
  type: DATABASE_TYPE,
  host: getEnvVariable('DATABASE_HOST'),
  port: parseInt(getEnvVariable('DATABASE_PORT'), 10),
  username: getEnvVariable('DATABASE_USERNAME'),
  password: getEnvVariable('DATABASE_PASSWORD'),
  database: getEnvVariable('DATABASE_NAME'),
  synchronize: false,
  logging: true,
  entities: entities,
  migrations: ['src/db/migrations/*.ts'],
  subscribers: [],
};

export const AppDataSource = new DataSource(dataSource);
