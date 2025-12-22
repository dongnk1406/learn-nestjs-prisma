import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @Matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/)
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  status?: UserStatus;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  accessToken: string;
  @IsNotEmpty()
  refreshToken: string;
}
