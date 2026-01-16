import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
