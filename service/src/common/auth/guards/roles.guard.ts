import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequirePermissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { TUserContextDto } from '../dto/userContext.dto';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest<Request>();
    const user: TUserContextDto = request['user'] as TUserContextDto;

    if (!user) {
      throw new ForbiddenException();
    }

    // Reads RequirePermissions metadata from the route. Check for required permissions first (more granular)
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      RequirePermissions,
      [context.getHandler(), context.getClass()],
    );

    if (requiredPermissions) {
      const hasAllPermissions = requiredPermissions.every((permission) =>
        user.permissions?.includes(permission),
      );

      if (!hasAllPermissions) {
        throw new ForbiddenException();
      }
      return true;
    }

    // Fallback to role-based check. Reads Roles metadata from the route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles) {
      const hasRequiredRole = requiredRoles.includes(user.roleName);

      if (!hasRequiredRole) {
        throw new ForbiddenException();
      }
      return true;
    }

    return true;
  }
}
