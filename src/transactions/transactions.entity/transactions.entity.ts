import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionsEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true, unique: true })
  uuid: string;

  @Column({ nullable: true, unique: true })
  numero_transaction: string;

  @Column({ nullable: true })
  libelle: string;

  @Column({ nullable: true })
  montant: number;

  @Column({ nullable: true })
  type_transaction_id: number;

  @Column({ nullable: true })
  beneficiaire_id: number;

  @Column({ nullable: true })
  expediteur_id: number;

  @Column({ nullable: true })
  etat_transaction: number;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
