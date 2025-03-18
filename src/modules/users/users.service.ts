import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: IUser) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async getUserByFirebaseUid(authId: string) {
    return this.userRepository.findOneOrFail({ where: { authId } });
  }

  async getUserById(id: string) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
