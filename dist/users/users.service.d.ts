import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity/users.entity';
import { IResponse } from 'src/utils/Interface';
import { HelperService } from 'src/helper/helper.service';
export declare class UsersService {
    private usersRepository;
    private readonly helperService;
    constructor(usersRepository: Repository<UsersEntity>, helperService: HelperService);
    findAll(): Promise<IResponse>;
    findOne(id: number): Promise<IResponse>;
    getByNumber(number: string): Promise<IResponse>;
    getSolde(id: number): Promise<IResponse>;
    create(user: UsersEntity): Promise<IResponse>;
    update(id: number, user: UsersEntity): Promise<IResponse>;
    remove(id: number): Promise<IResponse>;
    restore(id: number): Promise<IResponse>;
    updatePassword(id: number, oldPassword: string, password: string): Promise<IResponse>;
    restorePassword(id: number, password: string): Promise<IResponse>;
    updatePhoto(id: number, photo: string): Promise<IResponse>;
    updateCni(id: number, cni: string): Promise<IResponse>;
    updateCniImage(id: number, cni_recto: string, cni_verso: string): Promise<IResponse>;
}
