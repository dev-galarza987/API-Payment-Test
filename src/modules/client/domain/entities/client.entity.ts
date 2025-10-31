import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'client', schema: 'mecanix' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'int', name: 'client_id' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'client_code' })
  code: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastname: string;

  @Column({ type: 'varchar', unique: true, name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
