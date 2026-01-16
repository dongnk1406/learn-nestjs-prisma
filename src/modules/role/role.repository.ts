import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto, UpdateRoleDto, TRoleFilter } from './dto/role.dto';
import { Role, Prisma } from '@prisma/client';

// Define the include type for role with relations
const roleInclude = {
  permissions: {
    include: {
      permission: true,
    },
  },
} as const satisfies Prisma.RoleInclude;

type RoleWithPermissions = Prisma.RoleGetPayload<{
  include: typeof roleInclude;
}>;

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async createRole(data: CreateRoleDto): Promise<RoleWithPermissions> {
    const { permissionIds, ...roleData } = data;

    return this.prisma.role.create({
      data: {
        ...roleData,
        permissions: permissionIds
          ? {
              create: permissionIds.map((permissionId) => ({
                permissionId,
              })),
            }
          : undefined,
      },
      include: roleInclude,
    });
  }

  async findRoles(params: TRoleFilter) {
    const { itemsPerPage = 10, page = 1, search } = params;
    const skip = (page - 1) * itemsPerPage;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        where,
        skip,
        take: itemsPerPage,
        include: roleInclude,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.role.count({ where }),
    ]);

    return {
      data,
      total,
      currentPage: page,
      itemsPerPage,
    };
  }

  async findRoleById(id: number): Promise<RoleWithPermissions | null> {
    return this.prisma.role.findUnique({
      where: { id },
      include: roleInclude,
    });
  }

  async updateRole(
    id: number,
    data: UpdateRoleDto,
  ): Promise<RoleWithPermissions> {
    const { permissionIds, ...updateData } = data;

    if (permissionIds !== undefined) {
      // First, remove all existing permissions
      await this.prisma.rolePermission.deleteMany({
        where: { roleId: id },
      });

      // Then add the new permissions
      if (permissionIds.length > 0) {
        await this.prisma.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({
            roleId: id,
            permissionId,
          })),
        });
      }
    }

    return this.prisma.role.update({
      where: { id },
      data: updateData,
      include: roleInclude,
    });
  }

  async deleteRole(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    // Remove existing permissions
    await this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    // Add new permissions
    if (permissionIds.length > 0) {
      await this.prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId,
          permissionId,
        })),
      });
    }
  }
}
