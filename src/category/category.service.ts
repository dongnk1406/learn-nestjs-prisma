import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import {
  CreateCategoryDto,
  TCategoryFilter,
  TCategoryPaginationResponse,
  UpdateCategoryDto,
} from './dto/category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findCategoryByName(
      categoryData.name,
    );

    if (existingCategory) {
      throw new HttpException(
        { message: 'This category name has been used' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryRepository.createCategory(categoryData);
  }

  async getCategoriesList(
    params: TCategoryFilter,
  ): Promise<TCategoryPaginationResponse> {
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

    const [categoriesList, total] = await Promise.all([
      this.categoryRepository.getCategoriesList(payload),
      this.categoryRepository.getCategoriesListCount(payload),
    ]);

    return {
      data: categoriesList,
      total: total,
      itemsPerPage,
      currentPage: page,
    };
  }

  async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category) {
      throw new HttpException(
        { message: 'This category not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return category;
  }

  async updateCategory(id: number, body: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      body,
    );
    return updatedCategory;
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.deleteCategory(id);
  }
}
