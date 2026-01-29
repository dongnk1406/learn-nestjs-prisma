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
  LoginDto,
  LoginResponseDto,
  TUserFilter,
  TUserPaginationResponse,
  UpdateUserDto,
  UserDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/auth/decorators/public.decorator';
import { ResponseMessage } from 'src/common/interceptors/response.decorator';
import { RequirePermissions } from 'src/common/auth/decorators/permissions.decorator';
import {
  COMMENT_PERMISSIONS,
  USER_PERMISSIONS,
} from 'src/utils/constants/permissions.constant';

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

  @Public()
  @ResponseMessage('Login successful')
  @Post('login')
  login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.userService.login(body);
  }

  @Get()
  @RequirePermissions([USER_PERMISSIONS.READ_USER])
  getUsersList(@Query() params: TUserFilter): Promise<TUserPaginationResponse> {
    return this.userService.getUsersList(params);
  }

  @Get('me')
  getMyInfo(@UserContext() userContext: TUserContextDto): Promise<UserDto> {
    return this.userService.getMyInfo(Number(userContext.id));
  }

  @Get(':id')
  @RequirePermissions([USER_PERMISSIONS.READ_USER])
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUser(Number(id));
  }

  @Put(':id')
  @RequirePermissions([USER_PERMISSIONS.UPDATE_USER])
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @RequirePermissions([USER_PERMISSIONS.DELETE_USER])
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.userService.deleteUser(id);
  }

  @Get(':userId/comments')
  @RequirePermissions([COMMENT_PERMISSIONS.READ_COMMENT])
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
