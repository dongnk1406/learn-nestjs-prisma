export interface Post {
  id: number
  title: string
  summary: string
  content: string
  status: number
  ownerId: number
  createdAt: string
  updatedAt: string
}

export interface CreatePostDto {
  title: string
  summary: string
  content: string
  status: number
  ownerId: number
  categoryIds: number[]
}

export interface UpdatePostDto {
  title: string
  summary: string
  content: string
  status: number
  ownerId: number
  categoryIds: number[]
}

export interface PostFilter {
  itemsPerPage?: number
  page?: number
  search?: string
}

export interface PostPaginationResponse {
  data: Post[]
  total: number
  currentPage: number
  itemsPerPage: number
}
