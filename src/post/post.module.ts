import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';
import { PostRepository } from './post.repository';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, PostRepository],
})
export class PostModule {}
