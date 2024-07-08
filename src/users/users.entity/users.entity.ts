import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true, unique: true })
  uuid: string;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  prenoms: string;

  @Column({ nullable: true, unique: true })
  telephone: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, unique: true })
  photo: string;

  @Column({ nullable: true })
  date_naissance: Date;

  @Column({ nullable: true })
  cni: string;

  @Column({ nullable: true, unique: true })
  cni_recto: string;

  @Column({ nullable: true, unique: true })
  cni_verso: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  solde: string;

  @Column({ nullable: true })
  role_id: number;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
