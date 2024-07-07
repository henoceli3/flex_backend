import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  nom: string;

  @Column({ nullable: true })
  prenoms: string;

  @Column({ nullable: false, unique: true })
  telephone: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
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

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  solde: string;

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false })
  is_active: boolean;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
