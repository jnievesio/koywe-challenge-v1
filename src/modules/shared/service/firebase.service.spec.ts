import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
    createUser: jest.fn(),
  })),
}));

describe('FirebaseService', () => {
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it('Servicio debe estar definido', () => {
    expect(firebaseService).toBeDefined();
  });

  it('Debe crear usuario correctamente', async () => {
    const mockUserRecord = {
      uid: 'newuser123',
      email: 'new@example.com',
      emailVerified: false,
      disabled: false,
      metadata: {
        creationTime: 'timestamp',
        lastSignInTime: 'timestamp',
        lastRefreshTime: 'timestamp',
        toJSON: () => ({
          creationTime: 'timestamp',
          lastSignInTime: 'timestamp',
          lastRefreshTime: 'timestamp',
        }),
      },
      providerData: [],
      toJSON: () => ({ uid: 'newuser123' }),
      passwordHash: undefined,
      passwordSalt: undefined,
      customClaims: undefined,
      tokensValidAfterTime: undefined,
      tenantId: undefined,
    };

    const mockCreateUser = jest.fn().mockResolvedValue(mockUserRecord);

    const mockAuth = {
      createUser: mockCreateUser,
    } as unknown as admin.auth.Auth;

    jest.spyOn(admin, 'auth').mockImplementation(() => mockAuth);

    const result = await firebaseService.createUser(
      'new@example.com',
      'password123',
    );
    expect(result).toEqual(mockUserRecord);
  });

  it('Debe verificar token correctamente', async () => {
    const mockDecodedToken = {
      uid: 'user123',
      aud: 'test-audience',
      auth_time: Date.now(),
      exp: Date.now() + 3600,
      firebase: { sign_in_provider: 'custom', identities: {} },
      iat: Date.now(),
      iss: 'https://securetoken.google.com/my-app',
      sub: 'user123',
      email: 'test@example.com',
      email_verified: true,
    };

    const mockVerifyToken = jest.fn().mockResolvedValue(mockDecodedToken);

    const mockAuth = {
      verifyIdToken: mockVerifyToken,
    } as unknown as admin.auth.Auth;

    jest.spyOn(admin, 'auth').mockImplementation(() => mockAuth);

    const result = await firebaseService.verifyToken('valid-token');
    expect(result).toEqual(mockDecodedToken);
  });

  it('Debe fallar al verificar token inválido', async () => {
    const mockVerifyToken = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('Invalid token'));
    });

    const mockAuth = {
      verifyIdToken: mockVerifyToken,
    } as unknown as admin.auth.Auth;

    jest.spyOn(admin, 'auth').mockImplementation(() => mockAuth);

    await expect(firebaseService.verifyToken('invalid-token')).rejects.toThrow(
      'Invalid token',
    );
  });

  it('Debe fallar al crear usuario con email inválido', async () => {
    const mockCreateUser = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('Invalid email'));
    });

    const mockAuth = {
      createUser: mockCreateUser,
    } as unknown as admin.auth.Auth;

    jest.spyOn(admin, 'auth').mockImplementation(() => mockAuth);

    await expect(
      firebaseService.createUser('invalid-email', 'password123'),
    ).rejects.toThrow('Invalid email');
  });
});
