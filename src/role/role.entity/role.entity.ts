import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false, unique: true })
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
