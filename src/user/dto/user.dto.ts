import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

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

  status: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @Matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/)
  phone: string;

  status: number;
}

export type TUserFilter = Partial<{
  itemsPerPage: number;
  page: number;
  search: string;
}>;

export type TUserPaginationResponse = {
  data: Array<User>;
  total: number;
  currentPage: number;
  itemsPerPage: number;
};
