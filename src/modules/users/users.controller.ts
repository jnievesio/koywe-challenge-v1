import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../shared/guard/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import * as ResponseMessage from './response.messages';
import { API_RESPONSES } from '../../shared/constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Obtiene la lista de todos los usuarios registrados',
  })
  @ApiResponse({
    status: 200,
    description: ResponseMessage.USERS_LISTED.message,
    schema: {
      example: {
        users: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Joselyne Nieves',
            email: 'example@example.com',
            authId: 'firebase_auth_id_example',
            createdAt: '2024-03-18T00:00:00.000Z',
            updatedAt: '2024-03-18T01:00:00.000Z',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: API_RESPONSES.UNAUTHORIZED.description,
  })
  @ApiResponse({
    status: 500,
    description: API_RESPONSES.INTERNAL_SERVER_ERROR.description,
  })
  @Get('')
  @UseGuards(AuthGuard)
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }
}
