import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number

  @Column({ name: 'uri_image' })
  uriImage: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deteletedAt?: Date
}
