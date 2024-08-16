import { JwtService } from '@nestjs/jwt';
import { HelperService } from 'src/helper/helper.service';
import { UsersEntity } from 'src/users/users.entity/users.entity';
import { IResponse } from 'src/utils/Interface';
import { Repository } from 'typeorm';
export declare class AuthentificationService {
    private usersRepository;
    private readonly helperService;
    private jwtService;
    constructor(usersRepository: Repository<UsersEntity>, helperService: HelperService, jwtService: JwtService);
    login(email: string, password: string): Promise<IResponse>;
}
