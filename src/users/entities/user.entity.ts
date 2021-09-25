import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deteletedAt?: Date
}
