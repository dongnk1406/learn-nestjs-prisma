import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post as PostMethod,
  Put,
  Query,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import {
  CreatePostDto,
  TPostFilter,
  TPostPaginationResponse,
  UpdatePostDto,
} from './dto/post.dto';
import { PostService } from './post.service';
import { CommentService } from 'src/comment/comment.service';
import {
  CommentDto,
  CreateCommentDto,
  CreateCommentForPostDto,
} from 'src/comment/dto/comment.dto';
import { UserContext } from 'src/auth/decorators/userContext.decorator';
import { TUserContextDto } from 'src/auth/dto/userContext.dto';

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @PostMethod()
  createUser(@Body() data: CreatePostDto): Promise<Post> {
    return this.postService.createPost(data);
  }

  @Get()
  getPostsList(@Query() data: TPostFilter): Promise<TPostPaginationResponse> {
    return this.postService.getPostsList(data);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Post> {
    return this.postService.getPost(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.postService.deletePost(id);
  }

  @PostMethod(':postId/comments')
  createCommentForPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: CreateCommentForPostDto,
    @UserContext() userContext: TUserContextDto,
  ): Promise<CommentDto> {
    const createCommentDto: CreateCommentDto = {
      ...body,
      postId,
    };
    return this.commentService.createComment(
      createCommentDto,
      Number(userContext.id),
    );
  }

  @Get(':postId/comments')
  getCommentsForPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<CommentDto[]> {
    return this.commentService.getCommentsByPostId(postId);
  }
}
