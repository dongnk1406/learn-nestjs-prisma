import type { ApiResponse } from 'src/types/response'
import { api } from '../lib/api'
import type {
  Post,
  CreatePostDto,
  UpdatePostDto,
  PostFilter,
  PostPaginationResponse,
} from '../types/post'

export const postService = {
  getPosts: async (params?: PostFilter): Promise<ApiResponse<PostPaginationResponse>> => {
    const response = await api.get('/posts', { params })
    return response.data
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },

  createPost: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post('/posts', data)
    return response.data
  },

  updatePost: async (id: number, data: UpdatePostDto): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, data)
    return response.data
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`)
  },

  getPostComments: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/comments`)
    return response.data
  },

  createCommentForPost: async (postId: number, data: { message: string }) => {
    const response = await api.post(`/posts/${postId}/comments`, data)
    return response.data
  },
}
