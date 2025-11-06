import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import {
  CreateUserDto,
  TUserFilter,
  TUserPaginationResponse,
  UpdateUserDto,
} from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new HttpException(
        { message: 'This email has been usued' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(userData.password, 10);

    return this.userRepository.createUser({
      ...userData,
      password: hashPassword,
    });
  }

  async getUsersList(params: TUserFilter): Promise<TUserPaginationResponse> {
    const itemsPerPage = Number(params.itemsPerPage) || 10;
    const page = Number(params.page) || 1;
    const search = params.search ?? '';

    const skip = page > 1 ? (page - 1) * itemsPerPage : 0;
    const payload = {
      itemsPerPage,
      search,
      skip,
      page,
    };

    const [usersList, total] = await Promise.all([
      this.userRepository.getUsersList(payload),
      this.userRepository.getUsersListCount(payload),
    ]);

    return {
      data: usersList,
      total: total,
      itemsPerPage,
      currentPage: page,
    };
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new HttpException(
        { message: 'This user not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async getMyInfo(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, body);
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
  }
}
