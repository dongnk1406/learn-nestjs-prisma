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
import {
  CreateUserDto,
  TUserFilter,
  TUserPaginationResponse,
  UpdateUserDto,
  UserDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { UserContext } from 'src/auth/decorators/userContext.decorator';
import { TUserContextDto } from 'src/auth/dto/userContext.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    void this.userService.deleteUser(id);
  }
}
