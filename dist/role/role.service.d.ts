import { RoleEntity } from './role.entity/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<RoleEntity>);
    findAll(): Promise<{
        resultat: RoleEntity[];
        message: string;
    }>;
}
