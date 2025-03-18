import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Joselyne Nieves',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'example@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    example: 'Secret123!',
    minLength: 6,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número o carácter especial',
  })
  password: string;
}
