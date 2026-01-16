import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  TPermissionFilter,
} from './dto/permission.dto';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionRepository {
  constructor(private prisma: PrismaService) {}

  async createPermission(data: CreatePermissionDto): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }

  async findPermissions(params: TPermissionFilter) {
    const { itemsPerPage = 10, page = 1, search } = params;
    const skip = (page - 1) * itemsPerPage;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { nameCode: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [permissions, total] = await Promise.all([
      this.prisma.permission.findMany({
        where,
        skip,
        take: itemsPerPage,
        orderBy: { name: 'asc' },
      }),
      this.prisma.permission.count({ where }),
    ]);

    return {
      data: permissions,
      total,
      page,
      itemsPerPage,
      totalPages: Math.ceil(total / itemsPerPage),
    };
  }

  async findPermissionById(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }

  async updatePermission(
    id: number,
    data: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.prisma.permission.update({
      where: { id },
      data,
    });
  }

  async deletePermission(id: number): Promise<Permission> {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
