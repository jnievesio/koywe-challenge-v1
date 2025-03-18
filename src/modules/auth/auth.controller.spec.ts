import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { faker } from '@faker-js/faker';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('Controlador definido', () => {
    expect(authController).toBeDefined();
  });

  it('Creación de usuario mockeado', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(authService, 'register').mockResolvedValue({
      ...newUser,
      authId: faker.string.uuid(),
      id: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    });

    const result = await authController.register(newUser);
    expect(result).toHaveProperty('message');
    expect(result).toEqual({
      message: 'Usuario creado exitosamente',
      statusCode: 'USER_CREATED',
    });
  });
});
