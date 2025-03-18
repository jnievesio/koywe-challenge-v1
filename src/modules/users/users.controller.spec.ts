import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { FirebaseService } from '../shared/service/firebase.service';
import { AuthGuard } from '../shared/guard/auth.guard';

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn(),
          },
        },
        {
          provide: FirebaseService,
          useValue: {
            verifyToken: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('Controlador definido', () => {
    expect(userController).toBeDefined();
  });

  it('Lista de usuarios mockeado', async () => {
    jest.spyOn(usersService, 'getAllUsers').mockResolvedValue([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        authId: faker.string.uuid(),
        id: faker.string.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    ]);

    const result = await userController.getAllUsers();
    expect(Array.isArray(result)).toBe(true);
  });
});
