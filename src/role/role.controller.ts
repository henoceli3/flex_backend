import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  async findAll(@Param('id') id: number) {
    await this.roleService.findAll(id);
  }
}
