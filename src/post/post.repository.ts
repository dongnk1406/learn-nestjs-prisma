import { Injectable } from '@nestjs/common';
import { CreatePostDto, TPostFilter, UpdatePostDto } from './dto/post.dto';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private prismaService: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const { categoryIds, ...postData } = data;
    return this.prismaService.post.create({
      data: {
        ...postData,
        category: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    const { categoryIds, ...postData } = data;

    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...postData,
        category: categoryIds
          ? {
              set: categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  deletePost(id: number) {
    void this.prismaService.post.delete({
      where: { id },
    });
  }
  async deletePostRawQuery(id: number) {
    await this.prismaService.$queryRaw`
      DELETE FROM "Post"
      WHERE id = ${id};
    `;
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
  async getPostRawQuery(id: number): Promise<Post | null> {
    const result = await this.prismaService.$queryRaw<Post[]>`
      SELECT *
      FROM "Post"
      WHERE id = ${id}
      LIMIT 1;
    `;
    return result[0] || null;
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
      // only selecting necessary fields ( id, name, email, phone in owner and id, name in category)
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
  async getPostsListRawQuery(params: TPostFilter & { skip: number }) {
    return this.prismaService.$queryRaw<Post[]>`
      SELECT *
      FROM "Post"
      WHERE (title ILIKE '%' || ${params.search} || '%'
        OR summary ILIKE '%' || ${params.search} || '%'
        OR content ILIKE '%' || ${params.search} || '%')
        AND status = 1
      LIMIT ${params.itemsPerPage} OFFSET ${params.skip};
    `;
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
  async getPostsListCountRawQuery(params: TPostFilter) {
    const result = await this.prismaService.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM "Post"
      WHERE (title ILIKE '%' || ${params.search} || '%'
        OR summary ILIKE '%' || ${params.search} || '%'
        OR content ILIKE '%' || ${params.search} || '%')
        AND status = 1;
    `;
    return Number(result[0]?.count || 0);
  }
}
