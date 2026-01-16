export const USER_PERMISSIONS = {
  CREATE_USER: 'CREATE_USER',
  READ_USER: 'READ_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
} as const;

export const ROLE_PERMISSIONS = {
  CREATE_ROLE: 'CREATE_ROLE',
  READ_ROLE: 'READ_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',
} as const;

export const PERMISSION_PERMISSIONS = {
  CREATE_PERMISSION: 'CREATE_PERMISSION',
  READ_PERMISSION: 'READ_PERMISSION',
  UPDATE_PERMISSION: 'UPDATE_PERMISSION',
  DELETE_PERMISSION: 'DELETE_PERMISSION',
  ASSIGN_PERMISSIONS: 'ASSIGN_PERMISSIONS',
} as const;

export const POST_PERMISSIONS = {
  CREATE_POST: 'CREATE_POST',
  READ_POST: 'READ_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
} as const;

export const COMMENT_PERMISSIONS = {
  CREATE_COMMENT: 'CREATE_COMMENT',
  READ_COMMENT: 'READ_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
} as const;

export const CATEGORY_PERMISSIONS = {
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  READ_CATEGORY: 'READ_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
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
