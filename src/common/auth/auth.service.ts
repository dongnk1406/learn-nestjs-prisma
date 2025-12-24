import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDto): Promise<User> {
    const existingUser = await this.authRepository.findUserByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new HttpException(
        { message: 'This email has been used' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(userData.password, 10);

    return await this.authRepository.createUser({
      ...userData,
      password: hashPassword,
    });
  }

  async login(data: { email: string; password: string }): Promise<any> {
    //step 1: checking user is exist by email
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new HttpException(
        { message: 'Account is not exist.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const verify = await compare(data.password, user.password);

    if (!verify) {
      throw new HttpException(
        { message: 'Password does not correct.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //step 2: generate access token and refresh token
    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
