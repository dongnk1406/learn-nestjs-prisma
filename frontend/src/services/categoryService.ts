import type { ApiResponse } from 'src/types/response'
import { api } from '../lib/api'
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilter,
  CategoryPaginationResponse,
} from '../types/category'

export const categoryService = {
  getCategories: async (params?: CategoryFilter): Promise<ApiResponse<CategoryPaginationResponse>> => {
    const response = await api.get('/categories', { params })
    return response.data
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories', data)
    return response.data
  },

  updateCategory: async (id: number, data: UpdateCategoryDto): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data)
    return response.data
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },
}
