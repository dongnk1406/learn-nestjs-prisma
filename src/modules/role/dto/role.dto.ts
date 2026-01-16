import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsInt,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PermissionDto } from '../../permission/dto/permission.dto';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissionIds?: number[];
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissionIds?: number[];
}

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  permissions?: PermissionDto[];
}

export class AssignPermissionsDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  permissionIds: number[];
}

export type TRoleFilter = Partial<{
  itemsPerPage: number;
  page: number;
  search: string;
}>;

export type TRolePaginationResponse = {
  data: Array<RoleDto>;
  total: number;
  currentPage: number;
  itemsPerPage: number;
};
