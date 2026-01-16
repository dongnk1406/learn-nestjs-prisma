import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PrismaService],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
