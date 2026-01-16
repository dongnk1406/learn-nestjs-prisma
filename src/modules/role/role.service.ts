import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { RoleRepository } from './role.repository';
import {
  CreateRoleDto,
  UpdateRoleDto,
  RoleDto,
  TRoleFilter,
  TRolePaginationResponse,
  AssignPermissionsDto,
} from './dto/role.dto';
import { PermissionDto } from '../permission/dto/permission.dto';

// Type for role with permissions from repository
type RoleWithPermissions = Prisma.RoleGetPayload<{
  include: {
    permissions: {
      include: {
        permission: true;
      };
    };
  };
}>;

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createRole(data: CreateRoleDto): Promise<RoleDto> {
    const role = await this.roleRepository.createRole(data);
    return this.transformRole(role);
  }

  async getRoles(params: TRoleFilter): Promise<TRolePaginationResponse> {
    const result = await this.roleRepository.findRoles(params);
    return {
      ...result,
      data: result.data.map((role) => this.transformRole(role)),
    };
  }

  async getRole(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findRoleById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return this.transformRole(role);
  }

  async updateRole(id: number, data: UpdateRoleDto): Promise<RoleDto> {
    const existingRole = await this.roleRepository.findRoleById(id);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    const updatedRole = await this.roleRepository.updateRole(id, data);
    return this.transformRole(updatedRole);
  }

  async deleteRole(id: number): Promise<void> {
    const existingRole = await this.roleRepository.findRoleById(id);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.deleteRole(id);
  }

  async assignPermissions(
    roleId: number,
    data: AssignPermissionsDto,
  ): Promise<RoleDto> {
    const existingRole = await this.roleRepository.findRoleById(roleId);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.assignPermissions(roleId, data.permissionIds);
    return this.getRole(roleId);
  }

  private transformRole(role: RoleWithPermissions): RoleDto {
    const transformed = plainToInstance(RoleDto, role, {
      excludeExtraneousValues: true,
    });

    if (role.permissions) {
      transformed.permissions = role.permissions.map((rp) =>
        plainToInstance(PermissionDto, rp.permission, {
          excludeExtraneousValues: true,
        }),
      );
    }

    return transformed;
  }
}
