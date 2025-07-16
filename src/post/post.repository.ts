import { Injectable } from '@nestjs/common';
import { CreatePostDto, TPostFilter, UpdatePostDto } from './dto/post.dto';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private prismaService: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    return this.prismaService.post.create({ data });
  }
  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
  }
  deletePost(id: number) {
    void this.prismaService.post.delete({
      where: { id },
    });
  }
  async getPost(id: number): Promise<Post | null> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async getPostsList(params: TPostFilter & { skip: number }) {
    return this.prismaService.post.findMany({
      take: params.itemsPerPage,
      skip: params.skip,
      where: {
        OR: [
          {
            title: {
              contains: params.search,
            },
          },
          {
            summary: {
              contains: params.search,
            },
          },
          {
            content: {
              contains: params.search,
            },
          },
        ],
        AND: [
          {
            status: 1,
          },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async getPostsListCount(params: TPostFilter) {
    return this.prismaService.post.count({
      where: {
        OR: [
          {
            title: {
              contains: params.search,
            },
          },
          {
            summary: {
              contains: params.search,
            },
          },
          {
            content: {
              contains: params.search,
            },
          },
        ],
        AND: [
          {
            status: 1,
          },
        ],
      },
    });
  }
}
