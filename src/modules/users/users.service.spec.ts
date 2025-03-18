import { faker } from '@faker-js/faker';
import { UsersService } from './users.service';
import {
  checkConnection,
  closeTestDB,
  configTestDB,
} from '../../../test/utils/test-db';

describe('UsersService', () => {
  let userService: UsersService;

  beforeAll(async () => {
    const testDB = await configTestDB();
    userService = testDB.moduleFixture.get<UsersService>(UsersService);
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
      authId: faker.string.uuid(),
    };
    const result = await userService.createUser(newUser);
    expect(result).toHaveProperty('id');
  });

  it('Lista de usuarios registrados en la base de datos', async () => {
    const user = await userService.getAllUsers();
    expect(Array.isArray(user)).toBe(true);
  });

  afterAll(async () => {
    await closeTestDB();
  });
});
