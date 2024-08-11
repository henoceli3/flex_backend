import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeTransactionsEntity } from './type-transactions.entity/type-transactions.entity';
import { v4 } from 'uuid';

@Injectable()
export class TypeTransactionsService {
  constructor(
    @InjectRepository(TypeTransactionsEntity)
    private readonly typeTransactionsRepository: Repository<TypeTransactionsEntity>,
  ) {}

  async findAll() {
    try {
      return {
        resultat: await this.typeTransactionsRepository.find({
          where: { is_active: true },
        }),
        message: 'Success',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      return {
        resultat: await this.typeTransactionsRepository.findOneBy({ id }),
        message: 'Success',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async create(typeTransactions: TypeTransactionsEntity) {
    try {
      if (!typeTransactions.libelle) {
        throw new BadRequestException('le libelle est requis');
      }
      return {
        resultat: await this.typeTransactionsRepository.save({
          uuid: v4(),
          is_active: true,
          created_at: new Date(),
          libelle: typeTransactions.libelle,
        }),

        message: 'Success',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }
}
