import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { CommentModule } from 'src/modules/comment/comment.module';

@Module({
  imports: [CommentModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, UserRepository],
})
export class UserModule {}
