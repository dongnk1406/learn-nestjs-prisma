import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CreatePermissionDto,
  PermissionDto,
  TPermissionFilter,
  TPermissionPaginationResponse,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async createPermission(data: CreatePermissionDto): Promise<PermissionDto> {
    const permission = await this.permissionRepository.createPermission(data);
    return plainToInstance(PermissionDto, permission, {
      excludeExtraneousValues: true,
    });
  }

  async getPermissions(
    params: TPermissionFilter,
  ): Promise<TPermissionPaginationResponse> {
    const result = await this.permissionRepository.findPermissions(params);
    return {
      ...result,
      data: result.data.map((permission) =>
        plainToInstance(PermissionDto, permission, {
          excludeExtraneousValues: true,
        }),
      ),
    };
  }

  async getPermission(id: number): Promise<PermissionDto> {
    const permission = await this.permissionRepository.findPermissionById(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return plainToInstance(PermissionDto, permission, {
      excludeExtraneousValues: true,
    });
  }

  async updatePermission(
    id: number,
    data: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    const existingPermission =
      await this.permissionRepository.findPermissionById(id);
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }

    const updatedPermission = await this.permissionRepository.updatePermission(
      id,
      data,
    );
    return plainToInstance(PermissionDto, updatedPermission, {
      excludeExtraneousValues: true,
    });
  }

  async deletePermission(id: number): Promise<void> {
    const existingPermission =
      await this.permissionRepository.findPermissionById(id);
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }
    await this.permissionRepository.deletePermission(id);
  }
}
