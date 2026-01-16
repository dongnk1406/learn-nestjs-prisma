import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, TUserFilter, UpdateUserDto } from './dto/user.dto';

const userWithRoleInclude = {
  role: {
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  },
};

type UserWithRole = Prisma.UserGetPayload<{
  include: typeof userWithRoleInclude;
}>;

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<string> {
    await this.prismaService.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
    return 'User successfully deleted';
  }

  async findUserByEmail(email: string): Promise<UserWithRole | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: userWithRoleInclude,
    });
  }

  async findUserById(id: number): Promise<UserWithRole | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: userWithRoleInclude,
    });
  }

  async getUsersList(params: TUserFilter & { skip: number }): Promise<User[]> {
    return this.prismaService.user.findMany({
      take: params.itemsPerPage,
      skip: params.skip,
      where: {
        OR: [
          { name: { contains: params.search } },
          { email: { contains: params.search } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUsersListCount(
    params: TUserFilter & { skip: number },
  ): Promise<number> {
    return this.prismaService.user.count({
      where: {
        OR: [
          { name: { contains: params.search } },
          { email: { contains: params.search } },
        ],
      },
    });
  }
}
