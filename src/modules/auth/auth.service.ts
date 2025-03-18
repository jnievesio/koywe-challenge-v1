import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { FirebaseService } from '../shared/service/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private userService: UsersService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const firebaseUser = await this.firebaseService.createUser(
      registerUserDto.email,
      registerUserDto.password,
    );

    const newUser = await this.userService.createUser({
      authId: firebaseUser.uid,
      email: firebaseUser.email,
      ...registerUserDto,
    });

    return newUser;
  }
}
