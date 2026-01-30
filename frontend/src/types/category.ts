export interface Category {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryDto {
  name: string
  description: string
}

export interface UpdateCategoryDto {
  name: string
  description: string
}

export interface CategoryFilter {
  itemsPerPage?: number
  page?: number
  search?: string
}

export interface CategoryPaginationResponse {
  data: Category[]
  total: number
  currentPage: number
  itemsPerPage: number
}
