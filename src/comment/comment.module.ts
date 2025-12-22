import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
