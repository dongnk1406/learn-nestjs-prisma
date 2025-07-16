import { Post } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  summary: string;
  @IsNotEmpty()
  content: string;
  status: number;
  @IsNotEmpty()
  ownerId: number;
  @IsNotEmpty()
  categoryId: number;
}

export class UpdatePostDto {
  title: string;
  summary: string;
  content: string;
  status: number;
  ownerId: number;
  categoryId: number;
}

export type TPostFilter = Partial<{
  itemsPerPage: number;
  page: number;
  search: string;
}>;

export type TPostPaginationResponse = {
  data: Post[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
};
