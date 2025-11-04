import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: RegisterDto): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
