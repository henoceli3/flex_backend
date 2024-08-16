import { TypeTransactionsService } from './type-transactions.service';
import { TypeTransactionsEntity } from './type-transactions.entity/type-transactions.entity';
export declare class TypeTransactionsController {
    private readonly typeTransactionsService;
    constructor(typeTransactionsService: TypeTransactionsService);
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
