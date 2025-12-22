import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  postId: number;
}

export class CreateCommentForPostDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  message?: string;
}

export class CommentDto {
  id: number;
  message: string;
  postId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date | null;

  // Optional nested objects
  author?: {
    id: number;
    name: string;
    email: string;
  };

  post?: {
    id: number;
    title: string;
  };
}

export class TCommentFilter {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  itemsPerPage?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  postId?: number;

  @IsOptional()
  @Type(() => Number)
  authorId?: number;
}

export class TCommentPaginationResponse {
  data: CommentDto[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
}
