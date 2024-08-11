import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll() {
    try {
      const all = await this.roleRepository.find();
      return { resultat: all, message: 'Success' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }
}
