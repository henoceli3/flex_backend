import { TransactionsEntity } from './transactions.entity/transactions.entity';
import { Repository } from 'typeorm';
import { HelperService } from 'src/helper/helper.service';
import { UsersEntity } from 'src/users/users.entity/users.entity';
export declare class TransactionsService {
    private readonly transactionsRepository;
    private readonly userResposistery;
    private readonly helperService;
    constructor(transactionsRepository: Repository<TransactionsEntity>, userResposistery: Repository<UsersEntity>, helperService: HelperService);
    findAll(): Promise<{
        resultat: {
            beneficiaire: UsersEntity;
            expediteur: UsersEntity;
            id: number;
            uuid: string;
            numero_transaction: string;
            libelle: string;
            montant: number;
            type_transaction_id: number;
            beneficiaire_id: number;
            expediteur_id: number;
            etat_transaction: number;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        }[];
        message: string;
    }>;
    findOne(id: number): Promise<{
        resultat: {
            beneficiaire: UsersEntity;
            expediteur: UsersEntity;
            id: number;
            uuid: string;
            numero_transaction: string;
            libelle: string;
            montant: number;
            type_transaction_id: number;
            beneficiaire_id: number;
            expediteur_id: number;
            etat_transaction: number;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        };
        message: string;
    }>;
    getTransactionsByUser(id: number): Promise<{
        resultat: {
            beneficiaire: UsersEntity;
            expediteur: UsersEntity;
            id: number;
            uuid: string;
            numero_transaction: string;
            libelle: string;
            montant: number;
            type_transaction_id: number;
            beneficiaire_id: number;
            expediteur_id: number;
            etat_transaction: number;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        }[];
        message: string;
    }>;
    create(transaction: TransactionsEntity): Promise<{
        resultat: {
            nom_expediteur: string;
            prenom_expediteur: string;
            nom_beneficiaire: string;
            prenom_beneficiaire: string;
            uuid: string;
            libelle: string;
            numero_transaction: string;
            etat_transaction: number;
            created_at: Date;
            id: number;
            montant: number;
            type_transaction_id: number;
            beneficiaire_id: number;
            expediteur_id: number;
            updated_at: Date;
            deleted_at: Date;
        };
        message: string;
    }>;
}
