import type { ApiResponse } from 'src/types/response';
import { api } from '../lib/api';
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  LoginResponseDto,
  UserFilter,
  UserPaginationResponse,
} from '../types/user';

export const userService = {
  // Auth
  login: async (data: LoginDto): Promise<ApiResponse<LoginResponseDto>> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  register: async (data: CreateUserDto): Promise<ApiResponse<User>> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // User CRUD
  getUsers: async (
    params?: UserFilter,
  ): Promise<ApiResponse<UserPaginationResponse>> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getUser: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getMyProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateUser: async (
    id: number,
    data: UpdateUserDto,
  ): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<ApiResponse<string>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getUserComments: async (userId: number): Promise<ApiResponse<Comment[]>> => {
    const response = await api.get(`/users/${userId}/comments`);
    return response.data;
  },

  getMyComments: async (): Promise<ApiResponse<Comment[]>> => {
    const response = await api.get('/users/me/comments');
    return response.data;
  },
};
