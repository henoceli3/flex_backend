import { TransactionsService } from './transactions.service';
import { TransactionsEntity } from './transactions.entity/transactions.entity';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAll(): Promise<{
        resultat: {
            beneficiaire: import("../users/users.entity/users.entity").UsersEntity;
            expediteur: import("../users/users.entity/users.entity").UsersEntity;
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
            beneficiaire: import("../users/users.entity/users.entity").UsersEntity;
            expediteur: import("../users/users.entity/users.entity").UsersEntity;
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
    getTransactionsByUser(id: number): Promise<{
        resultat: {
            beneficiaire: import("../users/users.entity/users.entity").UsersEntity;
            expediteur: import("../users/users.entity/users.entity").UsersEntity;
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
}
