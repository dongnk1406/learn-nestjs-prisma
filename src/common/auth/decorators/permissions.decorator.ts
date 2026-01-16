import { Reflector } from '@nestjs/core';

export const RequirePermissions = Reflector.createDecorator<string[]>();
