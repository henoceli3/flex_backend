import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionsEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false, unique: true })
  numero_transaction: string;

  @Column({ nullable: false })
  montant: number;

  @Column({ nullable: false })
  type_transaction_id: number;

  @Column({ nullable: false })
  beneficiaire_id: number;

  @Column({ nullable: false })
  expediteur_id: number;

  @Column({ nullable: false })
  etat_transaction: boolean;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
