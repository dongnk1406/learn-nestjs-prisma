import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

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
  reminders: string[];
}

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @Matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/)
  phone: string;

  status: number;
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
  status: number;
  @Expose()
  reminders: string[];
  @Exclude()
  password: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
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
