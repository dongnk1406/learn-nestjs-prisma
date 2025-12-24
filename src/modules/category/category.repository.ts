import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCategoryDto,
  TCategoryFilter,
  UpdateCategoryDto,
} from './dto/category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data,
    });
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
    return this.prismaService.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }

  async findCategoryByName(name: string) {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }

  async findCategoryById(id: number) {
    return this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async getCategoriesList(params: TCategoryFilter & { skip: number }) {
    return this.prismaService.category.findMany({
      take: params.itemsPerPage,
      skip: params.skip,
      where: {
        OR: [
          { name: { contains: params.search } },
          { description: { contains: params.search } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCategoriesListCount(params: TCategoryFilter & { skip: number }) {
    return this.prismaService.category.count({
      where: {
        OR: [
          { name: { contains: params.search } },
          { description: { contains: params.search } },
        ],
      },
    });
  }
}
