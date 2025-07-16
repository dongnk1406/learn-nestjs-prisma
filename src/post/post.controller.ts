import {
  Body,
  Controller,
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

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

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
}
