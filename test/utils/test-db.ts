import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

let app: INestApplication;
let moduleFixture: TestingModule;
let isConnected = false;

export const configTestDB = async () => {
  if (!moduleFixture) {
    try {
      moduleFixture = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: '.env.test',
          }),
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) =>
              ({
                type: configService.get('DATABASE_TYPE'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
              }) as TypeOrmModuleOptions,
            inject: [ConfigService],
          }),
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
      isConnected = true;
    } catch (error) {
      console.error('Error al iniciar la aplicación:', error);
      return Promise.reject(
        'No se pudo establecer conexión con la base de datos',
      );
    }
  }
  return { app, moduleFixture };
};

export const checkConnection = () => {
  if (!isConnected) {
    return Promise.reject('No hay conexión a la base de datos');
  }
};

export const closeTestDB = async () => {
  if (app) {
    await app.close();
    isConnected = false;
  }
};
