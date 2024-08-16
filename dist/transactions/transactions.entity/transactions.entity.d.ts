export declare class TransactionsEntity {
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
}
