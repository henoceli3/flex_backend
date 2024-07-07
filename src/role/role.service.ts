import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(id?: number): Promise<RoleEntity[]> {
    try {
      if (id) {
        return await this.roleRepository.find({ where: { id } });
      }
      return await this.roleRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
}
