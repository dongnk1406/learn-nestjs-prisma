export const UserStatus = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
} as const

export type UserStatus = typeof UserStatus[keyof typeof UserStatus]

export interface User {
  id: number
  name: string
  email: string
  phone: string
  status: UserStatus
  roleId: number
  reminders: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  name: string
  phone: string
  email: string
  password: string
  roleId: number
  status?: UserStatus
  reminders: string[]
}

export interface UpdateUserDto {
  name: string
  phone: string
  roleId?: number
  status?: UserStatus
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  accessToken: string
  refreshToken: string
}

export interface UserFilter {
  itemsPerPage?: number
  page?: number
  search?: string
}

export interface UserPaginationResponse {
  data: User[]
  total: number
  currentPage: number
  itemsPerPage: number
}
