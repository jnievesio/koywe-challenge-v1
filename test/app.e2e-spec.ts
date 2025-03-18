import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { checkConnection, closeTestDB, configTestDB } from './utils/test-db';

describe('Test Apis de Koywe (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testDB = await configTestDB();
    app = testDB.app;
  }, 30000);

  beforeEach(() => {
    checkConnection();
  });

  describe('Autentitación', () => {
    it('Registrar un nuevo usuario', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .expect(201);
    });
  });

  describe('Usuarios', () => {
    it('Listar usuarios registrados', () => {
      return request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200)
        .expect((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body[0]).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              email: expect.any(String),
            }),
          );
        });
    });
  });

  afterAll(async () => {
    await closeTestDB();
  });
});
