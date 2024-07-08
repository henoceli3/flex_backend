import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity/users.entity';
import { IResponse } from 'src/utils/Interface';
import { v4 } from 'uuid';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly helperService: HelperService,
  ) {}

  async findAll(): Promise<IResponse> {
    try {
      return {
        resultat: await this.usersRepository.find({
          where: { is_active: true },
          select: [
            'id',
            'nom',
            'prenoms',
            'cni',
            'photo',
            'email',
            'telephone',
            'date_naissance',
            'uuid',
            'cni_recto',
            'cni_verso',
            'created_at',
            'updated_at',
            'deleted_at',
            'role_id',
            'solde',
          ],
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: true },
        select: [
          'id',
          'nom',
          'prenoms',
          'cni',
          'photo',
          'email',
          'telephone',
          'date_naissance',
          'uuid',
          'cni_recto',
          'cni_verso',
          'created_at',
          'updated_at',
          'deleted_at',
          'role_id',
          'solde',
        ],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: user,
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async create(user: UsersEntity): Promise<IResponse> {
    try {
      const userEmailExists = await this.usersRepository.findOne({
        where: {
          email: user.email,
          is_active: true,
        },
      });
      if (userEmailExists) {
        throw new NotAcceptableException('Email déjà utilisé');
      }
      const userTelephoneExists = await this.usersRepository.findOne({
        where: {
          telephone: user.telephone,
          is_active: true,
        },
      });
      if (userTelephoneExists) {
        throw new NotAcceptableException('Telephone déjà utilisé');
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          password: await this.helperService.hashPassword(user.password),
          uuid: v4(),
          is_active: true,
          created_at: new Date(),
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async update(id: number, user: UsersEntity): Promise<IResponse> {
    try {
      const userToUpdate = await this.usersRepository.findOne({
        where: { id, is_active: true },
      });
      if (!userToUpdate) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: await this.usersRepository.save({
          ...userToUpdate,
          ...user,
          updated_at: new Date(),
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async remove(id: number): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: true },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          is_active: false,
          deleted_at: new Date(),
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }
  async restore(id: number): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: false },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          is_active: true,
          deleted_at: null,
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    password: string,
  ): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: true },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const match = await this.helperService.checkPassword(
        oldPassword,
        user.password,
      );
      if (!match) {
        throw new NotAcceptableException(
          'Le mot de passe actuel est incorrect',
        );
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          password: await this.helperService.hashPassword(password),
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async restorePassword(id: number, password: string): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: true },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          password: await this.helperService.hashPassword(password),
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async updatePhoto(id: number, photo: string): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, is_active: true },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        resultat: await this.usersRepository.save({
          ...user,
          photo,
        }),
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }
}
