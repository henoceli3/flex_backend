import { UsersService } from './users.service';
import { UsersEntity } from './users.entity/users.entity';
export declare class UsersController {
    readonly usersService: UsersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../utils/Interface").IResponse>;
    findOne(id: number): Promise<import("../utils/Interface").IResponse>;
    getByNumber(number: string): Promise<import("../utils/Interface").IResponse>;
    getSolde(id: number): Promise<import("../utils/Interface").IResponse>;
    create(user: UsersEntity): Promise<import("../utils/Interface").IResponse>;
    update(id: number, user: UsersEntity): Promise<import("../utils/Interface").IResponse>;
    delete(id: number): Promise<import("../utils/Interface").IResponse>;
    restore(id: number): Promise<import("../utils/Interface").IResponse>;
    updatePassword(id: number, oldPassword: string, password: string): Promise<import("../utils/Interface").IResponse>;
    restorePassword(id: number, password: string): Promise<import("../utils/Interface").IResponse>;
    updatePhoto(id: number, photo: Express.Multer.File): Promise<import("../utils/Interface").IResponse>;
    updateCni(id: number, cni: Express.Multer.File): Promise<import("../utils/Interface").IResponse>;
    updateCniImage(id: number, cni_recto: Express.Multer.File, cni_verso: Express.Multer.File): Promise<import("../utils/Interface").IResponse>;
}
