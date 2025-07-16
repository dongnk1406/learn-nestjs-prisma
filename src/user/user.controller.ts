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
import { User } from '@prisma/client';
import {
  CreateUserDto,
  TUserFilter,
  TUserPaginationResponse,
  UpdateUserDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get()
  getUsersList(@Query() params: TUserFilter): Promise<TUserPaginationResponse> {
    return this.userService.getUsersList(params);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(Number(id));
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    void this.userService.deleteUser(id);
  }
}
