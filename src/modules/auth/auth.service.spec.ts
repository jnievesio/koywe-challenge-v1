import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';
import {
  checkConnection,
  closeTestDB,
  configTestDB,
} from '../../../test/utils/test-db';

describe('AuthService', () => {
  let userService: AuthService;

  beforeAll(async () => {
    const testDB = await configTestDB();
    userService = testDB.moduleFixture.get<AuthService>(AuthService);
  }, 30000);

  beforeEach(() => {
    checkConnection();
  });

  it('Servicio definido', () => {
    expect(userService).toBeDefined();
  });

  it('Creación de usuario en base de datos', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const result = await userService.register(newUser);
    expect(result).toHaveProperty('id');
  });

  afterAll(async () => {
    await closeTestDB();
  });
});
