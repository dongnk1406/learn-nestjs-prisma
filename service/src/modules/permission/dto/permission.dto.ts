import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nameCode: string;
}

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nameCode?: string;
}

export class PermissionDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  nameCode: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date | null;
}

export interface TPermissionFilter {
  page?: number;
  itemsPerPage?: number;
  search?: string;
}

export interface TPermissionPaginationResponse {
  data: PermissionDto[];
  total: number;
  page: number;
  itemsPerPage: number;
  totalPages: number;
}
