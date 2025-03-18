import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { FirebaseService } from '../service/firebase.service';

@Injectable()
export class AuthGuard {
  constructor(private readonly firebaseService: FirebaseService) {}

  private extractBearerToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    const [bearer, token] = authHeader?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Bearer token no proporcionado');
    }

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request.user = decodedToken;
      return true;
    } catch (error: unknown) {
      const firebaseError = error as Error;
      throw new UnauthorizedException(
        `Token inválido: ${firebaseError.message}`,
      );
    }
  }
}
