import type { ApiResponse } from 'src/types/response';
import { api } from '../lib/api';
import type { Comment } from '../types/comment';

export const commentService = {
  async getComments(): Promise<ApiResponse<ApiResponse<Comment[]>>> {
    const response = await api.get('/comments');
    return response.data;
  },

  async getCommentById(id: number): Promise<ApiResponse<Comment>> {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  async createComment(data: {
    content: string;
    postId: number;
    authorId: number;
  }): Promise<ApiResponse<Comment>> {
    const response = await api.post('/comments', data);
    return response.data;
  },

  async updateComment(
    id: number,
    data: Partial<{ content: string }>,
  ): Promise<ApiResponse<Comment>> {
    const response = await api.patch(`/comments/${id}`, data);
    return response.data;
  },

  async deleteComment(id: number): Promise<ApiResponse<void>> {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },
};
