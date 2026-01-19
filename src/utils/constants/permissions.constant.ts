export const USER_PERMISSIONS = {
  CREATE_USER: 'user:create',
  READ_USER: 'user:read',
  UPDATE_USER: 'user:update',
  DELETE_USER: 'user:delete',
} as const;

export const ROLE_PERMISSIONS = {
  CREATE_ROLE: 'role:create',
  READ_ROLE: 'role:read',
  UPDATE_ROLE: 'role:update',
  DELETE_ROLE: 'role:delete',
} as const;

export const PERMISSION_PERMISSIONS = {
  CREATE_PERMISSION: 'permission:create',
  READ_PERMISSION: 'permission:read',
  UPDATE_PERMISSION: 'permission:update',
  DELETE_PERMISSION: 'permission:delete',
  ASSIGN_PERMISSIONS: 'permission:assign',
} as const;

export const POST_PERMISSIONS = {
  CREATE_POST: 'post:create',
  READ_POST: 'post:read',
  UPDATE_POST: 'post:update',
  DELETE_POST: 'post:delete',
} as const;

export const COMMENT_PERMISSIONS = {
  CREATE_COMMENT: 'comment:create',
  READ_COMMENT: 'comment:read',
  UPDATE_COMMENT: 'comment:update',
  DELETE_COMMENT: 'comment:delete',
} as const;

export const CATEGORY_PERMISSIONS = {
  CREATE_CATEGORY: 'category:create',
  READ_CATEGORY: 'category:read',
  UPDATE_CATEGORY: 'category:update',
  DELETE_CATEGORY: 'category:delete',
} as const;

export const PERMISSIONS = {
  ...USER_PERMISSIONS,
  ...ROLE_PERMISSIONS,
  ...PERMISSION_PERMISSIONS,
  ...POST_PERMISSIONS,
  ...COMMENT_PERMISSIONS,
  ...CATEGORY_PERMISSIONS,
} as const;

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const getAllPermissionCodes = (): string[] => {
  return Object.values(PERMISSIONS);
};

export const getPermissionsByModule = (module: string): string[] => {
  switch (module.toLowerCase()) {
    case 'user':
      return Object.values(USER_PERMISSIONS);
    case 'role':
      return Object.values(ROLE_PERMISSIONS);
    case 'permission':
      return Object.values(PERMISSION_PERMISSIONS);
    case 'post':
      return Object.values(POST_PERMISSIONS);
    case 'comment':
      return Object.values(COMMENT_PERMISSIONS);
    case 'category':
      return Object.values(CATEGORY_PERMISSIONS);
    default:
      return [];
  }
};
