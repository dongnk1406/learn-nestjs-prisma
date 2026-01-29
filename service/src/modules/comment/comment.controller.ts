import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentDto,
  CreateCommentDto,
  TCommentFilter,
  TCommentPaginationResponse,
  UpdateCommentDto,
} from './dto/comment.dto';
import { UserContext } from 'src/common/auth/decorators/userContext.decorator';
import { TUserContextDto } from 'src/common/auth/dto/userContext.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(
    @Body() body: CreateCommentDto,
    @UserContext() userContext: TUserContextDto,
  ): Promise<CommentDto> {
    return this.commentService.createComment(body, Number(userContext.id));
  }

  @Get()
  getCommentsList(
    @Query() params: TCommentFilter,
  ): Promise<TCommentPaginationResponse> {
    return this.commentService.getCommentsList(params);
  }

  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
    return this.commentService.getComment(id);
  }

  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
    @UserContext() userContext: TUserContextDto,
  ): Promise<CommentDto> {
    return this.commentService.updateComment(id, body, Number(userContext.id));
  }

  @Delete(':id')
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @UserContext() userContext: TUserContextDto,
  ): Promise<void> {
    return this.commentService.deleteComment(id, Number(userContext.id));
  }
}
