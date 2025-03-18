import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { FirebaseService } from '../service/firebase.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: FirebaseService,
          useValue: {
            verifyToken: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it('Servicio definido', () => {
    expect(authGuard).toBeDefined();
  });

  it('Debe permitir acceso cuando el token es válido', async () => {
    jest.spyOn(firebaseService, 'verifyToken').mockResolvedValue({
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
    });

    const mockRequestWithValidToken = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid-token',
          },
        }),
      }),
    } as ExecutionContext;

    const result = await authGuard.canActivate(mockRequestWithValidToken);
    expect(result).toBe(true);
  });

  it('Debe denegar acceso cuando no hay token en la petición', async () => {
    const mockRequestWithoutToken = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;

    await expect(
      authGuard.canActivate(mockRequestWithoutToken),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('Debe denegar acceso cuando el token es inválido', async () => {
    const mockRequestWithInvalidToken = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid-token',
          },
        }),
      }),
    } as ExecutionContext;

    jest
      .spyOn(firebaseService, 'verifyToken')
      .mockRejectedValue(new Error('Invalid token'));

    await expect(
      authGuard.canActivate(mockRequestWithInvalidToken),
    ).rejects.toThrow(UnauthorizedException);
  });
});
