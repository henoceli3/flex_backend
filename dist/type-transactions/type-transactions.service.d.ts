import { Repository } from 'typeorm';
import { TypeTransactionsEntity } from './type-transactions.entity/type-transactions.entity';
export declare class TypeTransactionsService {
    private readonly typeTransactionsRepository;
    constructor(typeTransactionsRepository: Repository<TypeTransactionsEntity>);
    findAll(): Promise<{
        resultat: TypeTransactionsEntity[];
        message: string;
    }>;
    findOne(id: number): Promise<{
        resultat: TypeTransactionsEntity;
        message: string;
    }>;
    create(typeTransactions: TypeTransactionsEntity): Promise<{
        resultat: {
            uuid: string;
            is_active: true;
            created_at: Date;
            libelle: string;
        } & TypeTransactionsEntity;
        message: string;
    }>;
}
