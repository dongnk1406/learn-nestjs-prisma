import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { UserStatus } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @Matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/)
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;

  status?: UserStatus;
  reminders: string[];
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @Matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/)
  phone: string;

  @IsOptional()
  @IsInt()
  roleId?: number;

  status?: UserStatus;
}

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  email: string;
  @Expose()
  status: UserStatus;
  @Expose()
  reminders: string[];
  @Expose()
  roleId: number;
  @Exclude()
  password: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(6, { message: 'Password length is at least 6 characters.' })
  password: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  accessToken: string;
  @IsNotEmpty()
  refreshToken: string;
}

export type TUserFilter = Partial<{
  itemsPerPage: number;
  page: number;
  search: string;
}>;

export type TUserPaginationResponse = {
  data: Array<UserDto>;
  total: number;
  currentPage: number;
  itemsPerPage: number;
};
