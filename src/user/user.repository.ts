import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, TUserFilter, UpdateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';

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

  async deleteUser(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUsersList(params: TUserFilter & { skip: number }) {
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

  async getUsersListCount(params: TUserFilter & { skip: number }) {
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
