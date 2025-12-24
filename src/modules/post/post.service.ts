import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import {
  CreatePostDto,
  TPostFilter,
  TPostPaginationResponse,
  UpdatePostDto,
} from './dto/post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.createPost(data);
    return post;
  }

  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    return this.postRepository.updatePost(id, data);
  }

  async getPost(id: number): Promise<Post> {
    const post = await this.postRepository.getPost(id);
    if (!post) {
      throw new HttpException(
        { message: 'Post not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return post;
  }

  async getPostsList(data: TPostFilter): Promise<TPostPaginationResponse> {
    const itemsPerPage = Number(data.itemsPerPage) || 10;
    const page = Number(data.page) || 1;
    const search = data.search || '';
    const skip = page > 1 ? (page - 1) * itemsPerPage : 0;

    const payload = {
      itemsPerPage,
      search,
      skip,
      page,
    };

    const [usersList, total] = await Promise.all([
      this.postRepository.getPostsList(payload),
      this.postRepository.getPostsListCount(payload),
    ]);

    return {
      data: usersList,
      total: total,
      itemsPerPage,
      currentPage: page,
    };
  }
  deletePost(id: number): void {
    void this.postRepository.deletePost(id);
  }
}
