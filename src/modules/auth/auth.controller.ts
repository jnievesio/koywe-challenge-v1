import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/create-user.dto';
import * as ResponseMessage from './response.messages';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_RESPONSES } from '../../shared/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea un nuevo usuario usando Firebase Authentication y lo almacena en la base de datos',
  })
  @ApiResponse({
    status: 201,
    description: ResponseMessage.USER_CREATED.message,
    schema: {
      example: {
        ...ResponseMessage.USER_CREATED,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: API_RESPONSES.BAD_REQUEST.description,
  })
  @ApiResponse({
    status: 500,
    description: API_RESPONSES.INTERNAL_SERVER_ERROR.description,
  })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      await this.authService.register(registerUserDto);
      return {
        ...ResponseMessage.USER_CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
