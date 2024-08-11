import { Controller, Get, HttpCode } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  @HttpCode(201)
  async findAll() {
    await this.roleService.findAll();
  }
}
