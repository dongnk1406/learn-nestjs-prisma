import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Comment } from '@prisma/client';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async createComment(
    data: CreateCommentDto & { authorId: number },
  ): Promise<Comment> {
    return this.prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async updateComment(id: number, data: UpdateCommentDto): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async deleteComment(id: number): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }

  async getCommentsList(params: {
    skip: number;
    itemsPerPage: number;
    search: string;
    postId?: number;
    authorId?: number;
  }) {
    const { skip, itemsPerPage, search, postId, authorId } = params;

    const where = {
      ...(search && {
        message: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }),
      ...(postId && { postId }),
      ...(authorId && { authorId }),
    };

    return this.prisma.comment.findMany({
      skip,
      take: itemsPerPage,
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCommentsListCount(params: {
    search: string;
    postId?: number;
    authorId?: number;
  }): Promise<number> {
    const { search, postId, authorId } = params;

    const where = {
      ...(search && {
        message: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }),
      ...(postId && { postId }),
      ...(authorId && { authorId }),
    };

    return this.prisma.comment.count({
      where,
    });
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCommentsByAuthorId(authorId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { authorId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
