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
import { Category } from '@prisma/client';
import {
  CreateCategoryDto,
  TCategoryFilter,
  TCategoryPaginationResponse,
  UpdateCategoryDto,
} from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Get()
  getCategoriesList(
    @Query() params: TCategoryFilter,
  ): Promise<TCategoryPaginationResponse> {
    return this.categoryService.getCategoriesList(params);
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getCategory(Number(id));
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    void this.categoryService.deleteCategory(id);
  }
}
