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
import { UserContext } from 'src/common/auth/decorators/userContext.decorator';
import { TUserContextDto } from 'src/common/auth/dto/userContext.dto';
import { CommentService } from 'src/modules/comment/comment.service';
import { CommentDto } from 'src/modules/comment/dto/comment.dto';
import {
  CreateUserDto,
  TUserFilter,
  TUserPaginationResponse,
  UpdateUserDto,
  UserDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/auth/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  @Public()
  @Post()
  createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }

  @Get()
  getUsersList(@Query() params: TUserFilter): Promise<TUserPaginationResponse> {
    return this.userService.getUsersList(params);
  }

  @Get('me')
  getMyInfo(@UserContext() userContext: TUserContextDto): Promise<UserDto> {
    return this.userService.getMyInfo(Number(userContext.id));
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUser(Number(id));
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.userService.deleteUser(id);
  }

  @Get(':userId/comments')
  getCommentsForUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CommentDto[]> {
    return this.commentService.getCommentsByAuthorId(userId);
  }

  @Get('me/comments')
  getMyComments(
    @UserContext() userContext: TUserContextDto,
  ): Promise<CommentDto[]> {
    return this.commentService.getCommentsByAuthorId(Number(userContext.id));
  }
}
