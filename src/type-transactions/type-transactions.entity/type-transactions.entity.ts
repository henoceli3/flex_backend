import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'type_transactions' })
export class TypeTransactionsEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true, unique: true })
  uuid: string;

  @Column({ nullable: true, unique: true })
  libelle: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
