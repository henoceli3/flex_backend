import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { UsersEntity } from 'src/users/users.entity/users.entity';
import { IResponse } from 'src/utils/Interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthentificationService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly helperService: HelperService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<IResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email, is_active: true },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const match = await this.helperService.checkPassword(
        password,
        user.password,
      );
      if (!match) {
        throw new NotAcceptableException('Password incorrect');
      }
      const payload = { user: user, telephone: user.telephone };
      return {
        resultat: {
          user,
          code: user.code,
          token: this.jwtService.sign(payload),
        },
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
