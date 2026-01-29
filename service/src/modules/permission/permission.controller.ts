import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RequirePermissions } from 'src/common/auth/decorators/permissions.decorator';
import { PERMISSION_PERMISSIONS } from 'src/utils/constants/permissions.constant';
import {
  CreatePermissionDto,
  PermissionDto,
  TPermissionFilter,
  TPermissionPaginationResponse,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @RequirePermissions([PERMISSION_PERMISSIONS.CREATE_PERMISSION])
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDto> {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Get()
  @RequirePermissions([PERMISSION_PERMISSIONS.READ_PERMISSION])
  async getPermissions(
    @Query() params: TPermissionFilter,
  ): Promise<TPermissionPaginationResponse> {
    return this.permissionService.getPermissions(params);
  }

  @Get(':id')
  @RequirePermissions([PERMISSION_PERMISSIONS.READ_PERMISSION])
  async getPermission(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PermissionDto> {
    return this.permissionService.getPermission(id);
  }

  @Put(':id')
  @RequirePermissions([PERMISSION_PERMISSIONS.UPDATE_PERMISSION])
  async updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    return this.permissionService.updatePermission(id, updatePermissionDto);
  }

  @Delete(':id')
  @RequirePermissions([PERMISSION_PERMISSIONS.DELETE_PERMISSION])
  async deletePermission(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.permissionService.deletePermission(id);
  }
}
