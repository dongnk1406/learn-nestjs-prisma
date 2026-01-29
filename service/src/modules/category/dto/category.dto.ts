import { Category } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export type TCategoryFilter = Partial<{
  itemsPerPage: number;
  page: number;
  search: string;
}>;

export type TCategoryPaginationResponse = {
  data: Array<Category>;
  total: number;
  currentPage: number;
  itemsPerPage: number;
};
