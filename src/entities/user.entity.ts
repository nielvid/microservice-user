import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: true })
  firstname: string;
  @Column({ nullable: true })
  lastname: string;
  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ type: 'simple-json', nullable: true })
  extras: Record<string, unknown>;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
