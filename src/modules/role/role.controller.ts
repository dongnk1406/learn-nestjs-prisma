import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleDto,
  UpdateRoleDto,
  RoleDto,
  TRoleFilter,
  TRolePaginationResponse,
  AssignPermissionsDto,
} from './dto/role.dto';
import { RequirePermissions } from 'src/common/auth/decorators/permissions.decorator';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import {
  ROLE_PERMISSIONS,
  PERMISSION_PERMISSIONS,
} from 'src/utils/constants/permissions.constant';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequirePermissions([ROLE_PERMISSIONS.CREATE_ROLE])
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  @RequirePermissions([ROLE_PERMISSIONS.READ_ROLE])
  async getRoles(
    @Query() params: TRoleFilter,
  ): Promise<TRolePaginationResponse> {
    return this.roleService.getRoles(params);
  }

  @Get(':id')
  @RequirePermissions([ROLE_PERMISSIONS.READ_ROLE])
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    return this.roleService.getRole(id);
  }

  @Put(':id')
  @RequirePermissions([ROLE_PERMISSIONS.UPDATE_ROLE])
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions([ROLE_PERMISSIONS.DELETE_ROLE])
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @Post(':id/permissions')
  @RequirePermissions([PERMISSION_PERMISSIONS.ASSIGN_PERMISSIONS])
  async assignPermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignPermissionsDto: AssignPermissionsDto,
  ): Promise<RoleDto> {
    return this.roleService.assignPermissions(id, assignPermissionsDto);
  }

  // Alternative endpoints for admin role access
  @Get('/admin/all')
  @Roles(['ADMIN'])
  async getAdminRoles(
    @Query() params: TRoleFilter,
  ): Promise<TRolePaginationResponse> {
    return this.roleService.getRoles(params);
  }
}
