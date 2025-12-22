import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import {
  CommentDto,
  CreateCommentDto,
  TCommentFilter,
  TCommentPaginationResponse,
  UpdateCommentDto,
} from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(
    data: CreateCommentDto,
    authorId: number,
  ): Promise<CommentDto> {
    const comment = await this.commentRepository.createComment({
      ...data,
      authorId,
    });
    return plainToInstance(CommentDto, comment);
  }

  async getComment(id: number): Promise<CommentDto> {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment) {
      throw new HttpException(
        { message: 'Comment not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return plainToInstance(CommentDto, comment);
  }

  async updateComment(
    id: number,
    data: UpdateCommentDto,
    authorId: number,
  ): Promise<CommentDto> {
    const existingComment = await this.commentRepository.findCommentById(id);
    if (!existingComment) {
      throw new HttpException(
        { message: 'Comment not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the user is the author of the comment
    if (existingComment.authorId !== authorId) {
      throw new HttpException(
        { message: 'You can only update your own comments' },
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedComment = await this.commentRepository.updateComment(id, data);
    return plainToInstance(CommentDto, updatedComment);
  }

  async deleteComment(id: number, authorId: number): Promise<void> {
    const existingComment = await this.commentRepository.findCommentById(id);
    if (!existingComment) {
      throw new HttpException(
        { message: 'Comment not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the user is the author of the comment
    if (existingComment.authorId !== authorId) {
      throw new HttpException(
        { message: 'You can only delete your own comments' },
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.deleteComment(id);
  }

  async getCommentsList(
    data: TCommentFilter,
  ): Promise<TCommentPaginationResponse> {
    const itemsPerPage = Number(data.itemsPerPage) || 10;
    const page = Number(data.page) || 1;
    const search = data.search || '';
    const skip = page > 1 ? (page - 1) * itemsPerPage : 0;

    const payload = {
      itemsPerPage,
      search,
      skip,
      page,
      postId: data.postId,
      authorId: data.authorId,
    };

    const [commentsList, total] = await Promise.all([
      this.commentRepository.getCommentsList(payload),
      this.commentRepository.getCommentsListCount(payload),
    ]);

    return {
      data: commentsList.map((comment) => plainToInstance(CommentDto, comment)),
      total: total,
      itemsPerPage,
      currentPage: page,
    };
  }

  async getCommentsByPostId(postId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepository.getCommentsByPostId(postId);
    return comments.map((comment) => plainToInstance(CommentDto, comment));
  }

  async getCommentsByAuthorId(authorId: number): Promise<CommentDto[]> {
    const comments =
      await this.commentRepository.getCommentsByAuthorId(authorId);
    return comments.map((comment) => plainToInstance(CommentDto, comment));
  }
}
